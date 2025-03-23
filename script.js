(() => {
  const isHomePage = () => {
    const currentURL = window.location.href;
    return (
      currentURL === "https://www.e-bebek.com" ||
      currentURL === "https://www.e-bebek.com/"
    );
  };

  if (!isHomePage()) {
    console.log("wrong page");
    return;
  }

  const init = () => {
    buildHTML();
    buildCSS();
    fetchProducts();
  };

  const buildHTML = () => {
    const targetElement = document.querySelector(".Section1");
    if (!targetElement) return;

    const carouselHTML = `
    <div id="ebebek-carousel">
        <h1>Beğenebileceğiniz Ürünler</h1>
        <button id="prevBtn"><</button>
        <div class="carousel-container">
            <div class="products-wrapper">
                <div class="products-track">
                    <!-- Kartlar burada olacak -->
                </div>
            </div>
        </div>
        <button id="nextBtn">></button>
    </div>
      `;

    targetElement.insertAdjacentHTML("afterend", carouselHTML);
  };

  const buildCSS = () => {
    const css = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
#ebebek-carousel {
    max-width: 1320px;
    margin:20px auto;
    position: relative;
    font-family: Poppins, "cursive";
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
    border-radius: 35px;
}

#ebebek-carousel h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.11;
    color: #F28E00;
    background-color: #FEF6EB;
    padding: 25px 67px;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    text-align: left;
    width: 100%; 
    margin:0 auto 20px auto;
    font-family: Quicksand-Bold;
}

.carousel-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    max-width: 1200px;
    margin:0 auto;
    padding: 0;
    overflow: hidden;
}

.products-wrapper {
    width: calc(290px * 4); 
    overflow: hidden;
    position: relative;
}

.products-track {
    display: flex;
    gap: 10px;
    transition: transform 0.5s ease;
}

.product-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    align-items: center;
    min-width: 260px;
    min-height: 500px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: left; 
    background: #fff;
    color: #7D7D7D;
}

.product-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    align-items: flex-start; 
    width: 100%;
    padding: 20px;
    gap: 15px; 
    flex-grow: 1; 
}

.product-info h3,
.product-info .price-wrapper,
.product-info .discount {
    text-align: left;
    width: 100%;
}

.product-card img {
    width: 100%;
    height: 200px; 
    object-fit: contain; 
    border-radius: 5px;
}

.product-card h3 {
    font-size: 12px;
    margin: 10px 0;
    height: 50px; 
    overflow: hidden; 
    display: flex;
    align-items: center; 
    text-align: left;
}

.add-to-cart {
    display: block;
    margin-top: auto; 
    width: 100%;
    height: 50px;
    padding: 10px;
    border: none;
    border-radius: 50px;
    background-color: #FFF7EC;
    color: #FE8800;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-size: 16px;
}

.add-to-cart:hover {
    background-color: #FE8800;
    color: white;
}

.price-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
}

.price-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
}

.old-price-wrapper {
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap; 
}

.old-price {
    font-size: 1.4rem;
    font-weight: 500;
    color: #999;
    text-decoration: line-through;
}

.discount {
    font-size: 18px;
    color: #00A365;
    font-weight: 700;
}

.discounted-price {
    font-size: 2.2rem;
    font-weight: 600;
    color: #00A365;
    margin-top: 5px;
    display: block;
}

.price {
    font-size: 2.2rem;
    font-weight: 600;
}

#prevBtn, #nextBtn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    background: #FEF6EBcc;
    color: #F18E00;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 18px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#prevBtn {
    left: -60px; 
}

#nextBtn {
    right: -60px; 
}

#prevBtn:hover, #nextBtn:hover {
    background: #FFFFFFe6;
    opacity: 1;
}

.product-card {
    position: relative;
    width: 250px;
    height: 350px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #EDEDED; 
    transition: border 0.3s ease-in-out;
}

.product-card:hover {
    border-color: #FE8800; 
}

.heart {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15); 
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: box-shadow 0.3s ease-in-out;
}

.heart:hover {
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.25); 
}

.heart img {
    position: absolute;
    width: 24px;
    height: 24px;
    transition: opacity 0.2s ease-in-out;
}

.heart .hover-img {
    width: 40px;
    height: 40px;
    opacity: 0;
}

.heart:hover .hover-img {
    opacity: 1;
}

.heart:hover .default-img {
    opacity: 0;
}


.heart.active {
    background-color: orange;
}

.heart.active .hover-img {
    opacity: 0;
}
@media screen and (max-width: 1200px) {
    .products-wrapper {
        width: calc(290px * 3);
    }
    #prevBtn, #nextBtn {
        width: 40px;
        height: 40px;
        font-size: 16px;
    }
}

@media screen and (max-width: 992px) {
    .products-wrapper {
        width: calc(290px * 2);
    }
    #prevBtn, #nextBtn {
        width: 35px;
        height: 35px;
        font-size: 14px;
    }
    #ebebek-carousel h1 {
        font-size: 2.2rem;
        padding: 20px;
    }
}

@media screen and (max-width: 768px) {
    .products-wrapper {
        width: calc(290px * 1);
    }
    .product-card {
        min-width: 240px;
        min-height: 450px;
    }
    .add-to-cart {
        font-size: 14px;
        height: 40px;
    }
    .heart {
        width: 35px;
        height: 35px;
    }
    .heart img {
        width: 20px;
        height: 20px;
    }
    #prevBtn, #nextBtn {
        width: 30px;
        height: 30px;
        font-size: 12px;
    }
}

@media screen and (max-width: 576px) {
    #ebebek-carousel {
        max-width: 100%;
        border-radius: 20px;
    }
    #ebebek-carousel h1 {
        font-size: 1.8rem;
        padding: 15px;
        text-align: center;
    }
    .products-wrapper {
        width: 100%;
    }
    .product-card {
        width: 90%;
        min-width: 200px;
    }
    #prevBtn, #nextBtn {
        display: none;
    }
}    
`;
    const styleTag = document.createElement("style");
    styleTag.innerHTML = css;
    document.head.appendChild(styleTag);
  };

  const LOCAL_STORAGE_KEY = "favoriteProducts";

  
  const saveFavoritesToLocalStorage = (favorites) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  };

  
  const getFavoritesFromLocalStorage = () => {
    const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };

  
  const fetchProducts = async () => {
    try {
      let products;
      const storedProducts = localStorage.getItem("products");

      if (storedProducts) {
        products = JSON.parse(storedProducts);
      } else {
        const response = await fetch(
          "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
        );
        if (!response.ok) throw new Error("Ürünleri çekerken hata oluştu.");

        products = await response.json();
        localStorage.setItem("products", JSON.stringify(products)); 
      }

      renderProducts(products);
    } catch (error) {
      console.error("API Hatası:", error);
    }
  };

  
  const renderProducts = (products) => {
    const track = document.querySelector(".products-track");
    if (!track) return;

    track.innerHTML = "";

    const favoriteProducts = getFavoritesFromLocalStorage();

    products.forEach((product) => {
      const isFavorite = favoriteProducts.includes(product.id); 
      const heartClass = isFavorite ? "active" : ""; 

      let priceHTML = `<span class="price">${product.price.toFixed(
        2
      )} TL</span>`;

      if (product.original_price > product.price) {
        const discountPercent = Math.round(
          100 - (product.price / product.original_price) * 100
        );
        priceHTML = `
                  <div class="price-container">
                      <div class="old-price-wrapper">
                          <del class="old-price">${product.original_price.toFixed(
                            2
                          )} TL</del> 
                          <span class="discount">%${discountPercent}</span>
                      </div>
                      <span class="discounted-price">${product.price.toFixed(
                        2
                      )} TL</span>
                  </div>
              `;
      }

      const productHTML = `
              <div class="product-card" data-id="${product.id}">
                  <div class="heart ${heartClass}">
                      <img class="default-img" src="https://www.e-bebek.com/assets/svg/default-favorite.svg" alt="Favorite" />
                      <img class="hover-img" src="https://www.e-bebek.com/assets/svg/default-hover-favorite.svg" alt="Favorite Hover" />
                  </div>
                  <img src="${product.img}" alt="${product.name}" onclick="window.open('${product.url}', '_blank')" />
                  <div class="product-info">
                      <h3 onclick="window.open('${product.url}', '_blank')">${product.name}</h3>
                      <div class="price-wrapper">
                          ${priceHTML}
                      </div>
                      <button class="add-to-cart">Sepete Ekle</button>
                  </div>
              </div>
          `;

      track.insertAdjacentHTML("beforeend", productHTML);
    });

    addHeartFunctionality();
    addCarouselFunctionality();
  };

  const addHeartFunctionality = () => {
    const hearts = document.querySelectorAll(".heart");
    const storedFavorites = getFavoritesFromLocalStorage(); // ID listesi olarak alıyoruz

    hearts.forEach((heart) => {
        const productCard = heart.closest(".product-card");
        if (!productCard) return;  

        const productId = productCard.getAttribute("data-id"); // ID'yi alıyoruz
        if (!productId) return;

        // Eğer ürün ID'si favorilerde varsa kalbi aktif hale getir
        if (storedFavorites.includes(productId)) {
            heart.classList.add("active");
        }

        heart.addEventListener("click", () => {
            heart.classList.toggle("active");
            let updatedFavorites = getFavoritesFromLocalStorage();

            if (heart.classList.contains("active")) {
                // Eğer favoriye ekleniyorsa ID'yi listeye ekle
                if (!updatedFavorites.includes(productId)) {
                    updatedFavorites.push(productId);
                }
            } else {
                // Favorilerden çıkar
                updatedFavorites = updatedFavorites.filter(id => id !== productId);
            }

            saveFavoritesToLocalStorage(updatedFavorites); // Local storage'a kaydet
        });
    });
};

  const addCarouselFunctionality = () => {
    const track = document.querySelector(".products-track");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (!track || !prevBtn || !nextBtn) return;

    let position = 0;
    const cardWidth = document.querySelector(".product-card").offsetWidth + 10;
    const totalCards = document.querySelectorAll(".product-card").length;
    const containerWidth =
      document.querySelector(".products-wrapper").offsetWidth;
    const visibleCards = Math.floor(containerWidth / cardWidth);
    const maxPosition = -((totalCards - visibleCards) * cardWidth);

    
    if (totalCards <= visibleCards) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      return;
    } else {
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    }

    nextBtn.addEventListener("click", () => {
      if (position - cardWidth >= maxPosition) {
        position -= cardWidth;
        track.style.transform = `translateX(${position}px)`;
      }
    });

    prevBtn.addEventListener("click", () => {
      if (position + cardWidth <= 0) {
        position += cardWidth;
        track.style.transform = `translateX(${position}px)`;
      }
    });
  };

  init();
})();
