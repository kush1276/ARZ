document.addEventListener('DOMContentLoaded', () => {
    // --- GLOBAL CONSTANTS & STATE ---
    let cart = JSON.parse(localStorage.getItem('arz_cart')) || [];
    
    // Available products definition (to simulate database)
    const PRODUCTS = {
        'silk_linen_trench': {
            id: 'silk_linen_trench',
            name: 'The Silk-Linen Trench',
            price: 39600,
            image: 'images/product_trench.png',
            category: 'outerwear',
            color: 'beige'
        },
        'cream_knit_polo': {
            id: 'cream_knit_polo',
            name: 'Cream Ribbed Polo',
            price: 19600,
            image: 'images/product_polo.png',
            category: 'knitwear',
            color: 'cream'
        },
        'tailored_linen_trousers': {
            id: 'tailored_linen_trousers',
            name: 'Tailored Linen Trousers',
            price: 22400,
            image: 'images/product_trouser.png',
            category: 'linen',
            color: 'white'
        },
        'sand_knit_sweater': {
            id: 'sand_knit_sweater',
            name: 'Sand Knit Sweater',
            price: 25600,
            image: 'images/product_sweater.png',
            category: 'knitwear',
            color: 'sand'
        },
        'dusty_blue_suit': {
            id: 'dusty_blue_suit',
            name: 'Dusty Blue A-Line Suit Set',
            price: 3200,
            image: 'images/dusty_blue_1.jpg',
            category: 'linen',
            color: 'blue'
        },
        'navy_blossom': {
            id: 'navy_blossom',
            name: 'Navy Blossom Suit Set',
            price: 1850,
            image: 'images/navy_blossom_3.jpg',
            category: 'linen',
            color: 'blue'
        }
    };

    // --- ELEMENTS ---
    const header = document.querySelector('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const cartBtn = document.querySelector('.cart-btn');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartDrawer = document.querySelector('.cart-drawer');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCountBubbles = document.querySelectorAll('.cart-count');
    const cartSubtotalEl = document.getElementById('cart-subtotal-val');
    
    // --- TOAST NOTIFICATION ---
    const showToast = (message) => {
        let toast = document.querySelector('.toast-msg');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-msg';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    // --- HEADER SCROLL ACTION ---
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // --- MOBILE MENU TOGGLE ---
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            header.classList.toggle('menu-open');
        });
    }

    // --- CART STATE MANAGEMENT ---
    const saveCart = () => {
        localStorage.setItem('arz_cart', JSON.stringify(cart));
        updateCartUI();
    };

    const updateCartUI = () => {
        // Update Count Bubbles
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBubbles.forEach(bubble => {
            bubble.textContent = totalItems;
        });

        // Populate Items in Side-Drawer
        if (!cartItemsContainer) return;
        
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty-message">
                    <h4>Your bag is empty</h4>
                    <p>Discover our curated collections and select pieces to add here.</p>
                </div>
            `;
            if (cartSubtotalEl) cartSubtotalEl.textContent = '₹0.00';
            return;
        }

        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const cartItemHtml = `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-header">
                            <h4 class="cart-item-title">${item.name}</h4>
                            <button class="cart-item-remove" data-index="${index}">Remove</button>
                        </div>
                        <div class="cart-item-meta">
                            Size: ${item.size.toUpperCase()}
                        </div>
                        <div class="cart-item-footer">
                            <div class="qty-selector">
                                <button class="qty-btn minus" data-index="${index}">-</button>
                                <span class="qty-val">${item.quantity}</span>
                                <button class="qty-btn plus" data-index="${index}">+</button>
                            </div>
                            <span class="cart-item-price">₹${itemTotal.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHtml);
        });

        if (cartSubtotalEl) {
            cartSubtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
        }

        // Bind events on dynamically added cart elements
        bindCartItemEvents();
    };

    const bindCartItemEvents = () => {
        // Remove Buttons
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                const removedName = cart[index].name;
                cart.splice(index, 1);
                saveCart();
                showToast(`Removed ${removedName} from bag`);
            });
        });

        // Quantity Buttons
        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('.qty-btn').dataset.index);
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                saveCart();
            });
        });

        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('.qty-btn').dataset.index);
                cart[index].quantity++;
                saveCart();
            });
        });
    };

    const addToCart = (id, size = 'm', qty = 1) => {
        const product = PRODUCTS[id];
        if (!product) return;

        // Check if item already exists in cart with same size
        const existingItem = cart.find(item => item.id === id && item.size === size);
        if (existingItem) {
            existingItem.quantity += qty;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: size,
                quantity: qty
            });
        }

        saveCart();
        openCart();
        showToast(`Added ${product.name} to bag`);
    };

    // --- CART DRAWER ACTIONS ---
    const openCart = () => {
        if (cartDrawer) cartDrawer.classList.add('open');
        if (cartOverlay) cartOverlay.classList.add('open');
    };

    const closeCart = () => {
        if (cartDrawer) cartDrawer.classList.remove('open');
        if (cartOverlay) cartOverlay.classList.remove('open');
    };

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Initialize Cart View on Load
    updateCartUI();

    // --- QUICK ADD TO CART HANDLERS ---
    document.querySelectorAll('[data-action="quick-add"]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = e.target.closest('[data-product-id]').dataset.productId;
            addToCart(productId, 'm', 1);
        });
    });

    // --- ACCORDION COMPONENT ---
    document.querySelectorAll('.accordion-title').forEach(title => {
        title.addEventListener('click', () => {
            const item = title.parentElement;
            item.classList.toggle('active');
        });
    });

    // --- INTERSECTION OBSERVER FOR SCROLL REVEAL ---
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        revealElements.forEach(el => el.classList.add('active'));
    }

    // --- PRODUCT DETAIL PAGE LOGIC ---
    // Handle Size Buttons
    const sizeBtns = document.querySelectorAll('.size-btn:not(.disabled)');
    let selectedSize = 'm';
    
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSize = btn.dataset.size;
        });
    });

    // Handle Gallery Thumbnail Switches
    const thumbBtns = document.querySelectorAll('.gallery-thumbnail');
    const mainProdImage = document.getElementById('main-product-img');
    
    thumbBtns.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbBtns.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            if (mainProdImage) {
                mainProdImage.src = thumb.dataset.image;
            }
        });
    });

    // Handle Detail Add To Cart Form Submission
    const detailAddToCartBtn = document.querySelector('.btn-add-to-cart');
    if (detailAddToCartBtn) {
        detailAddToCartBtn.addEventListener('click', () => {
            const productId = detailAddToCartBtn.dataset.productId;
            addToCart(productId, selectedSize, 1);
        });
    }

    // --- SHOP DYNAMIC CATEGORY AND FILTER LOGIC ---
    const shopProductGrid = document.querySelector('.shop-content .product-grid');
    const categoryTabs = document.querySelectorAll('.category-tabs a');
    const sizeCheckboxes = document.querySelectorAll('.filter-size-input');
    const colorDots = document.querySelectorAll('.color-dot');
    const sortSelect = document.querySelector('.sort-select');
    let activeCategory = 'all';
    let activeColors = [];
    let activeSizes = [];

    // Helper to render shop grid dynamically
    const filterAndRenderShop = () => {
        if (!shopProductGrid) return;
        
        let filtered = Object.values(PRODUCTS);

        // Filter Category
        if (activeCategory !== 'all') {
            filtered = filtered.filter(p => p.category === activeCategory);
        }

        // Filter Colors
        if (activeColors.length > 0) {
            filtered = filtered.filter(p => activeColors.includes(p.color));
        }

        // Sort
        if (sortSelect) {
            const val = sortSelect.value;
            if (val === 'price-low') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (val === 'price-high') {
                filtered.sort((a, b) => b.price - a.price);
            }
        }

        // Clear and Rebuild
        shopProductGrid.innerHTML = '';
        
        if (filtered.length === 0) {
            shopProductGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0; color: var(--color-text-muted);">
                    <h3>No items match the chosen filters.</h3>
                    <p style="margin-top: 1rem;">Try clearing your active filters to view all products.</p>
                </div>
            `;
            const countEl = document.querySelector('.product-count');
            if (countEl) countEl.textContent = '0 items';
            return;
        }

        filtered.forEach(p => {
            const cardHtml = `
                <div class="product-card reveal active" data-product-id="${p.id}">
                    <div class="product-image-container" onclick="window.location.href='product.html?id=${p.id}'">
                        <img src="${p.image}" class="product-image-default" alt="${p.name}">
                        <img src="${p.image === 'images/product_trench.png' ? 'images/product_trench_alt.png' : p.image}" class="product-image-hover" alt="${p.name} detail">
                        <div class="product-action-overlay">
                            <button class="btn-quick-add" data-action="quick-add-dyn" data-product-id="${p.id}">Add to Bag</button>
                        </div>
                    </div>
                    <div class="product-details">
                        <h3 class="product-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
                        <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
                    </div>
                </div>
            `;
            shopProductGrid.insertAdjacentHTML('beforeend', cardHtml);
        });

        // Re-bind quick add to cart events for dynamically created cards
        document.querySelectorAll('[data-action="quick-add-dyn"]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = e.target.dataset.productId;
                addToCart(productId, 'm', 1);
            });
        });

        // Update count
        const countEl = document.querySelector('.product-count');
        if (countEl) countEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'item' : 'items'}`;
    };

    // Category click handler
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeCategory = tab.dataset.category;
            filterAndRenderShop();
        });
    });

    // Color click handler
    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const col = dot.dataset.color;
            if (dot.classList.contains('active')) {
                dot.classList.remove('active');
                activeColors = activeColors.filter(c => c !== col);
            } else {
                dot.classList.add('active');
                activeColors.push(col);
            }
            filterAndRenderShop();
        });
    });

    // Sorting select handler
    if (sortSelect) {
        sortSelect.addEventListener('change', filterAndRenderShop);
    }

    // Set up product details from query string on product.html
    const setupProductDetailTemplate = () => {
        const mainDetailLayout = document.querySelector('.product-detail-layout');
        if (!mainDetailLayout) return;

        // Parse query param
        const urlParams = new URLSearchParams(window.location.search);
        const prodId = urlParams.get('id') || 'silk_linen_trench';
        const p = PRODUCTS[prodId];
        
        if (!p) return;

        // Set product metadata
        const titleEl = document.querySelector('.product-info-header h1');
        const priceEl = document.querySelector('.product-info-header .price');
        const mainImg = document.getElementById('main-product-img');
        const primaryThumb = document.getElementById('thumb-primary');
        const secondaryThumb = document.getElementById('thumb-secondary');
        const addToCartBtn = document.querySelector('.btn-add-to-cart');

        if (titleEl) titleEl.textContent = p.name;
        if (priceEl) priceEl.textContent = `₹${p.price.toLocaleString('en-IN')}`;
        
        if (addToCartBtn) {
            addToCartBtn.dataset.productId = p.id;
        }

        // Set Images
        if (p.id === 'silk_linen_trench') {
            if (mainImg) mainImg.src = 'images/product_trench.png';
            if (primaryThumb) {
                primaryThumb.src = 'images/product_trench.png';
                primaryThumb.dataset.image = 'images/product_trench.png';
            }
            if (secondaryThumb) {
                secondaryThumb.src = 'images/product_trench_alt.png';
                secondaryThumb.dataset.image = 'images/product_trench_alt.png';
            }
        } else {
            // For other products, reuse the single generated image + alt
            let defaultAlt = 'images/about_atelier.png';
            if (p.id === 'cream_knit_polo') defaultAlt = 'images/product_polo_alt.png';
            else if (p.id === 'tailored_linen_trousers') defaultAlt = 'images/product_trouser_alt.png';
            else if (p.id === 'sand_knit_sweater') defaultAlt = 'images/product_sweater_alt.png';
            else if (p.id === 'dusty_blue_suit') defaultAlt = 'images/dusty_blue_2.jpg';
            else if (p.id === 'navy_blossom') defaultAlt = 'images/navy_blossom_2.jpg';
            
            if (mainImg) mainImg.src = p.image;
            if (primaryThumb) {
                primaryThumb.src = p.image;
                primaryThumb.dataset.image = p.image;
            }
            if (secondaryThumb) {
                secondaryThumb.src = defaultAlt;
                secondaryThumb.dataset.image = defaultAlt;
            }
        }
    };

    // Set up shop category from query string on shop.html
    const setupShopCategory = () => {
        if (!shopProductGrid) return;
        const urlParams = new URLSearchParams(window.location.search);
        const catParam = urlParams.get('cat');
        if (catParam) {
            activeCategory = catParam;
            categoryTabs.forEach(tab => {
                if (tab.dataset.category === catParam) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
        }
        filterAndRenderShop();
    };

    // Run templates setups
    setupProductDetailTemplate();
    setupShopCategory();
});
