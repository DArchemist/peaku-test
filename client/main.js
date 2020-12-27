window.addEventListener('DOMContentLoaded', async () => {
    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this; 
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    async function getData() {
        return fetch('http://localhost:5000').then((data) => data.json());
    }

    function search(e) {
        const q = e.target.value.toLowerCase();

        currentProducts = products.filter(({ title, description }) => {
            const t = title.toLowerCase();
            const d = description.toLowerCase();
            
            return t.includes(q) || d.includes(q);
        })
        renderProducts(currentProducts);
    }
    
    function applyFilters() {
        const device = document.querySelector('#device-filter').value;
        const from = document.querySelector('#from-filter').value;
        const to = document.querySelector('#to-filter').value;

        let filteredProducts = currentProducts;
        
        const min = parseFloat(from);
        const max = parseFloat(to);
        const minValue = (isNaN(min)) ? 0 : min;
        const maxValue = (isNaN(max)) ? 0 : max;

        if (minValue > 0) filteredProducts = graterOrEqualsThan(minValue, filteredProducts); 
        
        if(maxValue > minValue) {
            filteredProducts = lessOrEqualsThan(maxValue, filteredProducts);
        }
        
        if (device !== 'none') filteredProducts = filterByDeviceType(device, filteredProducts); 

        renderProducts(filteredProducts);
    }

    function filterByDeviceType(type, products) {
        return products.filter(({ tag }) => tag === type);
    }

    function graterOrEqualsThan(minValue, products) {
        return products.filter(({ price }) => parseFloat(price) >= minValue);
    }

    function lessOrEqualsThan(maxValue, products) {
        return products.filter(({ price }) => parseFloat(price) <= maxValue);
    }

    function renderProducts(products) {
        const grid = document.querySelector('.grid');
        const results = document.querySelector('#results');
        
        grid.innerHTML = '';
        results.innerHTML = '';

        if (products.length === 0) {
            grid.innerHTML = '<p>Oops it seems we dont have products matching the description you are looking for :(</p>';
            return;
        }

        const result = document.createElement('h2');
        result.textContent = `${products.length} results`;

        results.append(result);

        products.forEach((product) => {

            const img = document.createElement('img');
            img.classList.add('card-image')
            img.src = "https://webscraper.io/images/test-sites/e-commerce/items/cart2.png";

            const nameText = document.createElement('h3');
            nameText.textContent = product.title.length > 20
                ? `${product.title.slice(0, 16)}...`
                : product.title;

            const tooltip = document.createElement('span');
            tooltip.classList.add('tooltipText');
            tooltip.textContent = product.title;

            const name = document.createElement('div');
            name.classList.add('tooltip');
            name.append(nameText);
            name.append(tooltip);
    
            const price = document.createElement('h3');
            price.textContent = `$${product.price}`;
            
            const title = document.createElement('div');
            title.classList.add('card-title')
            title.append(name);
            title.append(price);
    
            const description = document.createElement('p');
            description.textContent = product.description;
    
            const content = document.createElement('div');
            content.classList.add('card-body');
            content.append(title);
            content.append(description);
            
            const rating = document.createElement('p');
            rating.textContent = `${product.stars} stars`;
            const reviews = document.createElement('p');
            reviews.textContent = product.reviews;
    
            const footer = document.createElement('div');
            footer.classList.add('card-footer');
            footer.append(rating);
            footer.append(reviews);
    
            const card = document.createElement('div');
            card.classList.add('card');
            card.append(img);
            card.append(content);
            card.append(footer);
            
            grid.append(card);
        });
    }

    const products = await getData();
    let currentProducts = products;
    renderProducts(currentProducts);

    document.querySelector('#search').addEventListener('input', debounce(search, 250));
    document.querySelector('#device-filter').addEventListener('change', applyFilters);
    document.querySelector('#from-filter').addEventListener('input', debounce(applyFilters, 250));
    document.querySelector('#to-filter').addEventListener('input', debounce(applyFilters, 250));

    document.querySelector('#menu').addEventListener('click', () => {
        document.querySelector('aside').classList.toggle('show');
    });
})



