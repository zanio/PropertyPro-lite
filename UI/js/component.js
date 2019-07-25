const Header = `
<div class="container flex-row space-between align-center header">
        <div class="mobile-flex pt-2 pb-2">
                <a href="home.html">    <img class="img-res" src="images/PropertyPro-lite.png" alt="PropertyPro-lite Logo"></a>
             <div ><span><img class="bars" src="icons/menu.png" alt=""></span></div>
        </div> 
         <nav>
             <ul class="ul-link mobile">
                 <li>
                     <a href="home.html">Home</a>
                 </li>
                 <li>
                     <a href="post.html">Post Advert</a>
                 </li>
                 <li>
                     <a href="all-property.html">All Property</a>
                 </li>
                 <li class="property">
                   <p>  Type
                     <ul class="card-bg-white ">
                         <li><a href="flat.html">Flat</a></li>
                         <li><a href="land.html">Land</a></li>
                         <li><a href="miniflat.html">Mini-flat</a></li>
                         <li><a href="real-estate.html">real Estate</a></li>
                         
                     </ul>
                 </p>
                 </li>
                 <li>
                     <a href="about-us.html">About Us</a>
                 </li>
                 <li>
                     <a href="login.html">Login</a>
                 </li>
                 <li>
                     <a href="signup.html">Sign Up</a>
                 </li>
             </ul>
         </nav>
     </div>
`;

const AuthHeader = `
<div class="container flex-row space-between align-center header">
        <div class="mobile-flex pt-2 pb-2">
            <a href="home.html"> <img class="img-res" src="images/PropertyPro-lite.png" alt="PropertyPro-lite Logo"></a>
             <div ><span><img class="bars" src="icons/menu.png" alt="menu"></span></div>
        </div> 
         <nav>
             <ul class="ul-link mobile">
                 <li>
                     <a href="dashboard.html">Dashboard</a>
                 </li>
                 <li class="property"><p>Type<ul class=" ">
                              <li><a href="flat.html">Flat</a></li>
                              <li><a href="land.html">Land</a></li>
                              <li><a href="miniflat.html">Mini-flat</a></li>
                              <li><a href="real-estate.html">real Estate</a></li>
                          </ul>
                        </p>
                      </li>

                 <li>
                     <a class="btn mr-1 no-border btn-md btn-no-shadow btn-orange" href="no-advert.html">Post Ad</a>
                 </li>
                 
                 <li id="user-profile" class="user-li">
                     <img class="user-dp" src="icons/user.png" alt="User Account profile">
                     <ul class="user-setting hide">
                         <li><a href="my-account.html">My Account</a></li>
                         <li><a id="sign-out-button">Logout</a></li>
                     </ul>
                 </li>
             </ul>
         </nav>
     </div>

`;

const footer = `
<section class="flex-row flex-column align-center space-between">
        <!-- column one footer -->
        <div class="width-20 footer-ht">
            
            <div>
                <h2 class="heading ft-2 mb-1 btn-white-border">Contact Info</h2>
                <p class="small-text white"><span><img class="mr-1" src="images/location.png" alt=""></span>Blk 199, flat 4, jk Estate, lekki Lagos</p>
                <p class="small-text white"><span><img class="mr-1" src="icons/phone-call.png" alt=""></span>+234 81 770 52 462</p>
                <p class="small-text white"><span><img class="mr-1" src="icons/envelope.png" alt=""></span>support@propertyPro-lite.com</p>
            </div>
            <div class="mt-2">
                <h2 class="heading ft-2 mb-1 btn-white-border">About Us</h2> 
                <p class="small-text white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            </div>

        </div>

        <!-- column two footer -->
        <div class="width-20 footer-ht footer-auto mb-2">
             <div class="text-center ">
                    <a href="home.html">  <img class="img-res" src="images/PropertyPro-lite.png" alt="propertyPro-lite Logo"></a>
            </div>
            
            <div class="text-center display mt-2">
                    <a class="blue-link -light-blue" href="all-property.html">Visit Property Page</a>
            </div>
           
                
        </div>
        <!-- column three footer -->
        <div class="width-20 footer-ht">
            
                <div class="mb-3">
                    <h2 class="heading ft-2 mb-2 btn-white-border">Subscribe to our Newsletter</h2>
                    <input class="bg-trans mb-1" placeholder="Type your email..." type="text">
                    <button class="btn bg-trans -light-blue ft-08">Add</button>
                </div>
                <div>
                    <h2 class="heading ft-2 mb-1 btn-white-border">Useful Links</h2> 
                    <p><img class="mr-1" src="icons/unlink.png" alt="link to important pages">
                        <a class="blue-link -light-blue small-text" href="">New Jersey</a>
                        <a class="blue-link -light-blue small-text" href="">New Jersey</a>
                    </p>
                    <p><img class="mr-1" src="icons/unlink.png" alt="link to important pages">
                        <a class="blue-link -light-blue small-text" href="">New Jersey</a>
                        <a class="blue-link -light-blue small-text" href="">New Jersey</a>
                    </p>
                </div>

            </div>

    </section>

`;

const firstNwords = (words)=>{
    return words.split(' ').slice(0,10).join(' ');
}

const user_ads = (el)=>{
     return`
    <div class="dashboard-cards mb-1 user-ads">
                   <div class="item-image-main">
                      
                   </div>
                <div class="pt-1 pr-1 pb-1 pl-1 ">
                    <div class="flex-row space-between pb-1">
                        <h2 class="title-head ft-1 -blue">${el.property_name} <span class="block -orange get_id">ID - ${el.id}</span></h2>
                        <h2 class="title-head ft-1 -blue">N${el.price}</h2>
                    </div>
                    <p class="title-head ft-08 color-777 text-left">${firstNwords(el.property_description)}...</p>
                    <div class="flex-row space-between pb-1 mt-1 text-center">
                            <button onclick="location.href='update.html'" class="btn sm-padding  btn-blue btn-no-shadow no-border mobile-width-20 mb-1 ft-1  white">Update advert</button>
                            <button  class="btn  btn-orange btn-no-shadow no-border sm-padding mobile-width-20 mb-1 ft-1  white up mark-advert">Mark advert</button>
                            <button class="btn btn-danger btn-no-shadow no-border sm-padding mobile-width-20 ft-1 mb-1 white delete">Delete Advert</button>
                        </div>
                    <a class=" btn text-center btn-no-shadow border-c4 text-deco -light-blue ft-1 block bg-trans mb-1" href="">Preview advert</a>
                </div>
                   
        </div>`
}

const deleteMessage = `
<div class="width-50 mobile-modal bg-white shadow container center">
        <div class="mt-3 text-center">
        <div id="async-loading" class="lds-spinner hide width-20 center mb-3 mt-3"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <h2 class="ttle-head ft-1 pt-2 -blue">Are you sure about this ? this can't be undone
               </h2>
               <button class="btn btn-danger white ft-1 no-border btn-no-shadow mb-1 mt-3 deleteId" id = "modal">Delete</button> 
        </div>
    </div>
`

const updateMessage = `
<div  class="backdrop">
<div class="width-50 mobile-modal bg-white shadow container center">
    <div class="mt-3 text-center">
    <div id="async-loading" class="lds-spinner hide width-20 center mb-3 mt-3"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <h2 class="ttle-head ft-1 pt-2 -blue">Select what you would like to update
           </h2>
           <div class="pt-1 pb-1">
               <select value="" name="" id="select_options">
                   <option value="Available">Avalable</option>
                   <option value="Sold">Sold</option>
               </select>
           </div>
           <button class="btn btn-danger white ft-1 no-border btn-no-shadow mb-1 mt-3" id = "modal-update">Update Status</button> 
    </div>
</div>
</div>
`