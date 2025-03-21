(() => {
    const isHomePage = () => {
      const currentURL = window.location.href;
      return currentURL === "https://www.e-bebek.com" || currentURL === "https://www.e-bebek.com/";
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
          <h1>Beğenebileceğinizi Düşündüklerimiz</h1>
          <div class="carousel-container">
            <button id="prevBtn">←</button>
            <div class="products-wrapper">
              <div class="products-track"></div>
            </div>
            <button id="nextBtn">→</button>
          </div>
        </div>
      `;
  
      targetElement.insertAdjacentHTML("afterend", carouselHTML);
    };
  
    const buildCSS = () => {
        const css = `
          #ebebek-carousel {
            max-width: 1200px;
            margin: 20px auto;
            padding: 10px;
            text-align: center;
            position: relative; /* 🔥 Butonların Görünmesini Sağlar */
          }
      
          h1 {
            font-size: 24px;
            margin-bottom: 20px;
          }
      
          .carousel-container {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            max-width: 1200px;
            overflow: hidden;
          }
      
          .products-wrapper {
            width: 960px;
            overflow: hidden;
            position: relative;
          }
      
          .products-track {
            display: flex;
            gap: 10px;
            transition: transform 0.5s ease;
          }
      
          .product-card {
            min-width: 280px; /* 🔥 Kartları Genişlettik */
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            text-align: center;
            background: #fff;
          }
      
          .product-card img {
            width: 100%;
            height: auto;
            border-radius: 5px;
          }
      
          .product-card h3 {
            font-size: 16px;
            margin: 10px 0;
          }
      
          .price-wrapper {
            font-size: 14px;
            margin-top: 5px;
          }
      
          .discount {
            color: red;
            font-weight: bold;
          }
      
          /* 🔥 Butonlar Kesin Görünecek */
          #prevBtn, #nextBtn {
            background: rgba(0, 123, 255, 0.8);
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            font-size: 18px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 100; /* 🔥 Diğer Her Şeyin Üstünde Olacak */
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
            transition: background 0.3s ease, opacity 0.3s ease;
          }
      
          #prevBtn {
            left: 10px;
          }
      
          #nextBtn {
            right: 10px;
          }
      
          #prevBtn:hover, #nextBtn:hover {
            background: rgba(0, 86, 179, 0.9);
            opacity: 1;
          }
        `;
        const styleTag = document.createElement("style");
        styleTag.innerHTML = css;
        document.head.appendChild(styleTag);
      };
  
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json");
        if (!response.ok) throw new Error("Ürünleri çekerken hata oluştu.");
  
        const data = await response.json();
        renderProducts(data);
      } catch (error) {
        console.error("API Hatası:", error);
      }
    };
  
    const renderProducts = (products) => {
      const track = document.querySelector(".products-track");
      if (!track) return;
  
      products.forEach(product => {
        const discount = product.original_price > product.price
          ? `<span class="discount">%${Math.round(100 - (product.price / product.original_price) * 100)} indirim!</span>`
          : "";
  
        const productHTML = `
          <div class="product-card">
            <img src="${product.img}" alt="${product.name}" onclick="window.open('${product.url}', '_blank')" />
            <h3 onclick="window.open('${product.url}', '_blank')">${product.name}</h3>
            <div class="price-wrapper">
              <span class="price">${product.price.toFixed(2)} TL</span>
              ${product.original_price > product.price ? `<del>${product.original_price.toFixed(2)} TL</del>` : ""}
              ${discount}
            </div>
          </div>
        `;
  
        track.insertAdjacentHTML("beforeend", productHTML);
      });
  
      addCarouselFunctionality();
    };
  
    const addCarouselFunctionality = () => {
      const track = document.querySelector(".products-track");
      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");
  
      let position = 0;
      const cardWidth = 250; // 240px + margin/gap
      const visibleCards = 4;
      const totalCards = document.querySelectorAll(".product-card").length;
      const maxPosition = -(totalCards - visibleCards) * cardWidth;
  
      prevBtn.addEventListener("click", () => {
        if (position < 0) {
          position += cardWidth;
          track.style.transform = `translate3d(${position}px, 0, 0)`;
        }
      });
  
      nextBtn.addEventListener("click", () => {
        if (position > maxPosition) {
          position -= cardWidth;
          track.style.transform = `translate3d(${position}px, 0, 0)`;
        }
      });
    };
  
    init();
  })();