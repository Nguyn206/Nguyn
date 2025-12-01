let currentPage='home', cart=[], userProfile={name:'', email:'', loggedIn:false, phone:'', address:'', points:500, joinDate:new Date().toLocaleDateString('vi-VN')};

const products = [
    {
        id: 1,
        name: "Sản phẩm 1",
        desc: "Mô tả sản phẩm",
        price: 36000000,
        rating: 3.6,
        buyers: 36
    },
    {
        id: 2,
        name: "Sản phẩm 2",
        desc: "Mô tả sản phẩm",
        price: 36000000,
        rating: 3.6,
        buyers: 36
    },
    {
        id: 3,
        name: "Sản phẩm 3",
        desc: "Mô tả sản phẩm",
        price: 36000000,
        rating: 3.6,
        buyers: 36
    },
    {
        id: 4,
        name: "Sản phẩm 4",
        desc: "Mô tả sản phẩm",
        price: 36000000,
        rating: 3.6,
        buyers: 36
    },
    {
        id: 5,
        name: "Sản phẩm 5",
        desc: "Mô tả sản phẩm",
        price: 36000000,
        rating: 3.6,
        buyers: 36
    },
    {
        id: 6,
        name: "Sản phẩm 6",
        desc: "Mô tả sản phẩm",
        price: 36000000,
        rating: 3.6,
        buyers: 36
    },
    {
        id: 7,
        name: "Sản phẩm 7",
        desc: "Mô tả sản phẩm",
        price: 36000000,
        rating: 3.6,
        buyers: 36
    },
    {
        id: 8,
        name: "Sản phẩm 8",
        desc: "Mô tả sản phẩm",
        price: 36000000,
        rating: 3.6,
        buyers: 36
    },
    {
        id: 9,
        name: "Sản phẩm 9",
        desc: "Mô tả sản phẩm",
        price: 36000000,
        rating: 3.6,
        buyers: 36
    },
    {
        id: 10,
        name: "Sản phẩm 10",
        desc: "Mô tả sản phẩm",
        price: 36000000,
        rating: 3.6,
        buyers: 36
    },
    {
        id: 11,
        name: "Sản phẩm 11",
        desc: "Mô tả sản phẩm",
        price: 36000000,
        rating: 3.6,
        buyers: 36
    },
    {
        id: 12,
        name: "Sản phẩm 12",
        desc: "Mô tả sản phẩm",
        price: 36000000,
        rating: 3.6,
        buyers: 36
    }
];

const appDiv=document.getElementById('app'),
      cartCountSpan=document.getElementById('cart-count'),
      cartDrawer=document.getElementById('cart-drawer'),
      cartToggleBtn=document.getElementById('nav-cart-btn'),
      cartCloseBtn=document.getElementById('close-cart-btn');

function formatCurrency(n){ return new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(n); }

function showNotification(msg){
    let box=document.getElementById('notification-box');
    if(!box){ box=document.createElement('div'); box.id='notification-box'; document.body.appendChild(box); }
    box.textContent=msg; box.classList.add('show');
    setTimeout(()=>box.classList.remove('show'),3000);
}

function updateCartCount(){ cartCountSpan.textContent = cart.reduce((s,i)=>s+(i.quantity||1),0); }

function renderCart(){
    const cartItems=cart.map(item=>`
        <div class="flex justify-between cart-item">
            <div>${item.name} x ${item.quantity}</div>
            <div>${formatCurrency(item.price*item.quantity)}</div>
            <button data-id="${item.id}" class="remove-cart-item">Xóa</button>
        </div>`).join('');
    document.getElementById('cart-items').innerHTML = cartItems || `<p class="text-gray-400">Giỏ hàng trống.</p>`;
}

function addToCart(id, openDrawer=false){
    const p=products.find(x=>x.id===id);
    const idx=cart.findIndex(x=>x.id===id);
    if(idx>-1){cart[idx].quantity+=1;} 
    else {cart.push({...p,quantity:1});}
    updateCartCount(); renderCart(); showNotification(`${p.name} đã thêm vào giỏ hàng!`);
    if(openDrawer) cartDrawer.classList.add('open');
}

function removeFromCart(id){
    cart=cart.filter(x=>x.id!==id);
    updateCartCount(); renderCart();
    showNotification("Sản phẩm đã xóa khỏi giỏ hàng.");
}

function toggleCartDrawer(){ cartDrawer.classList.toggle('open'); }

function checkout(){ showNotification("Chức năng đặt hàng chưa hoàn thiện."); }

function renderHome(){
    let html=`<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">`;
    products.forEach(p=>{
        html+=`
        <div class="product-card flex flex-col">
            <img src="https://placehold.co/200x150/1E293B/00FFFF?text=SP${p.id}" class="mb-2 rounded-lg"/>
            <h2 class="text-cosmic-accent font-bold">${p.name}</h2>
            <p class="text-gray-400 text-sm mb-2">${p.desc}</p>
            <p class="text-cosmic-accent font-bold">${formatCurrency(p.price)}</p>
            <p class="text-yellow-400 mb-2">${'★'.repeat(p.rating)}${'☆'.repeat(5-p.rating)} (${p.buyers} người mua)</p>
            <button data-id="${p.id}" data-action="buy" class="buy-btn mt-auto mb-1">Mua</button>
            <button data-id="${p.id}" data-action="add" class="add-to-cart-btn mt-0 py-1">Thêm vào giỏ hàng</button>
        </div>`;
    });
    html+='</div>'; appDiv.innerHTML=html;
}

function renderProfile(){
    if(!userProfile.loggedIn){
        appDiv.innerHTML=`
        <div class="bg-cosmic-secondary p-6 rounded-lg max-w-md mx-auto shadow-lg">
            <h2 class="text-cosmic-accent text-2xl mb-4">Đăng Nhập / Đăng Ký</h2>
            <input id="input-name" placeholder="Họ và tên" class="w-full p-2 mb-2 rounded bg-gray-800 text-white"/>
            <input id="input-email" placeholder="Email" class="w-full p-2 mb-2 rounded bg-gray-800 text-white"/>
            <input id="input-phone" placeholder="SĐT" class="w-full p-2 mb-2 rounded bg-gray-800 text-white"/>
            <input id="input-address" placeholder="Địa chỉ" class="w-full p-2 mb-2 rounded bg-gray-800 text-white"/>
            <button id="login-btn" class="btn-primary w-full py-2">Đăng Nhập / Đăng Ký</button>
        </div>`;
        document.getElementById('login-btn').addEventListener('click', login);
    } else {
        appDiv.innerHTML=`
        <div id="profile-section">
            <div class="profile-card max-w-xl mx-auto">
                <img src="https://placehold.co/100x100/00FFFF/0A0C16?text=AV" class="profile-avatar"/>
                <div class="profile-name">${userProfile.name}</div>
                <div class="profile-email">${userProfile.email}</div>
                <div class="profile-stats">
                    <div class="profile-stat-item">Điểm <span>${userProfile.points}</span></div>
                    <div class="profile-stat-item">Tham gia <span>${userProfile.joinDate}</span></div>
                </div>
                <p>SĐT: ${userProfile.phone || 'Chưa cập nhật'}</p>
                <p>Địa chỉ: ${userProfile.address || 'Chưa cập nhật'}</p>
                <button id="edit-profile-btn" class="profile-edit-btn">Chỉnh sửa thông tin</button>
            </div>
        </div>`;
        document.getElementById('edit-profile-btn').addEventListener('click', editProfile);
    }
}

function login(){
    const name=document.getElementById('input-name').value.trim();
    const email=document.getElementById('input-email').value.trim();
    const phone=document.getElementById('input-phone').value.trim();
    const address=document.getElementById('input-address').value.trim();
    if(!name||!email||!phone||!address){showNotification('Vui lòng điền đủ thông tin!');return;}
    userProfile.name=name; 
    userProfile.email=email; 
    userProfile.phone=phone;
    userProfile.address=address;
    userProfile.loggedIn=true;
    showNotification('Đăng nhập thành công!');
    renderProfile();
}

function editProfile(){
    appDiv.innerHTML=`
    <div class="bg-cosmic-secondary p-6 rounded-lg max-w-md mx-auto shadow-lg">
        <h2 class="text-cosmic-accent text-2xl mb-4">Chỉnh sửa thông tin</h2>
        <input id="edit-name" value="${userProfile.name}" class="w-full p-2 mb-2 rounded bg-gray-800 text-white"/>
        <input id="edit-email" value="${userProfile.email}" class="w-full p-2 mb-2 rounded bg-gray-800 text-white"/>
        <input id="edit-phone" value="${userProfile.phone}" class="w-full p-2 mb-2 rounded bg-gray-800 text-white"/>
        <input id="edit-address" value="${userProfile.address}" class="w-full p-2 mb-2 rounded bg-gray-800 text-white"/>
        <button id="save-profile-btn" class="btn-primary w-full py-2">Lưu thông tin</button>
    </div>`;
    document.getElementById('save-profile-btn').addEventListener('click', ()=>{
        userProfile.name=document.getElementById('edit-name').value.trim();
        userProfile.email=document.getElementById('edit-email').value.trim();
        userProfile.phone=document.getElementById('edit-phone').value.trim();
        userProfile.address=document.getElementById('edit-address').value.trim();
        showNotification('Cập nhật thông tin thành công!');
        renderProfile();
    });
}

function renderShopInfo() {
    let html = `<h2 class="text-cosmic-accent text-2xl mb-4 font-bold">Quản Lý Gian Hàng</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">`;
    products.forEach(p => {
        html += `<div class="bg-cosmic-secondary p-4 rounded-lg shadow text-white">
            <h3 class="text-cosmic-accent font-bold mb-2">Sản phẩm ${p.id}</h3>
            <label>Tên sản phẩm:</label>
            <input data-id="${p.id}" data-field="name" value="${p.name}" class="edit-input w-full p-2 mb-2 rounded bg-gray-800 text-white"/>
            <label>Mô tả:</label>
            <textarea data-id="${p.id}" data-field="desc" class="edit-input w-full p-2 mb-2 rounded bg-gray-800 text-white">${p.desc}</textarea>
            <label>Giá:</label>
            <input type="number" data-id="${p.id}" data-field="price" value="${p.price}" class="edit-input w-full p-2 mb-2 rounded bg-gray-800 text-white"/>
            <label>Số sao (1-5):</label>
            <input type="number" min="1" max="5" data-id="${p.id}" data-field="rating" value="${p.rating}" class="edit-input w-full p-2 mb-2 rounded bg-gray-800 text-white"/>
            <label>Số người mua:</label>
            <input type="number" min="0" data-id="${p.id}" data-field="buyers" value="${p.buyers}" class="edit-input w-full p-2 mb-2 rounded bg-gray-800 text-white"/>
            <button data-id="${p.id}" class="save-product btn-primary mt-3 w-full py-2">Lưu thay đổi</button>
        </div>`;
    });
    html += `</div>`; appDiv.innerHTML = html;
}

appDiv.addEventListener('click', e => {
    if(e.target.classList.contains('save-product')){
        const id = parseInt(e.target.dataset.id);
        const inputs = document.querySelectorAll(`.edit-input[data-id="${id}"]`);
        inputs.forEach(input => {
            const field = input.dataset.field;
            let value = input.value;
            if(field === 'price' || field === 'rating' || field === 'buyers'){ value = parseInt(value); }
            products[id-1][field] = value;
        });
        showNotification("Sản phẩm đã được cập nhật!");
        renderShopInfo();
    }
    if(e.target.dataset.action==='buy'){ addToCart(parseInt(e.target.dataset.id), true); }
    if(e.target.dataset.action==='add'){ addToCart(parseInt(e.target.dataset.id), false); }
});

cartDrawer.addEventListener('click', (e) => {
    if(e.target.classList.contains('remove-cart-item')){
        const id=parseInt(e.target.dataset.id);
        removeFromCart(id);
    }
});

document.getElementById('nav-home').addEventListener('click',()=>{ currentPage='home'; renderHome(); });
document.getElementById('nav-profile').addEventListener('click',()=>{ currentPage='profile'; renderProfile(); });
document.getElementById('nav-shop').addEventListener('click',()=>{ currentPage='shop'; renderShopInfo(); });

cartToggleBtn.addEventListener('click', toggleCartDrawer);
cartCloseBtn.addEventListener('click', toggleCartDrawer);
document.getElementById('checkout-btn').addEventListener('click', checkout);

window.addEventListener('load',()=>{
    document.getElementById('initial-loading').style.display='none';
    renderHome(); updateCartCount();
});
