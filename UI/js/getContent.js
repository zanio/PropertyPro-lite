const page = {
    footer:{
        url: "./navigation/footer.html",
        element: ".insertFooter"
    },

    header:{
        url: "./navigation/header.html",
        element: ".insertHeader"
    },

    authHeader:{
        url: "./navigation/authheader.html",
        element: ".insertauthHeader"
    },

    form:{
        url: "./form/form-1.html",
        element: ".insertForm"
    },

    update:{
        url: "./form/update/form-1.html",
        element: ".insertUpdate"
    }
    
    
}


let getPage = function(){
    return location.pathname.split('/')[2]
}

const getPageContent = (url)=>{
    return new Promise((resolve, reject)=>{
            if(typeof window.fetch !== 'undefined'){
                fetch(url)
                .then(res => {
                    resolve(res)                
                }).catch(err =>{
                    reject(err)
                })

            } else{
                reject(err)
            }
        });
};


const loadPage = function(url , element,cb){

    getPageContent(url)
    .then(res=>res.text())
    .then(res=>{
        document.querySelector(element).insertAdjacentHTML('beforeend' , res)
        cb ?cb():null;
    } )
    .catch(err=>{console.log(err)})
}


//load footer on all pages
if(getPage() !== null)
    loadPage(page.footer.url , page.footer.element)




if( getPage() === "home.html" ||
    getPage() === "signup.html" ||
    getPage() === "all-property.html" ||
    getPage() === "single-property.html" ||
    getPage() === "flat.html" ||
    getPage() === "miniflat.html" ||
    getPage() === "land.html" ||
    getPage() === "real-estate.html" ||
    getPage() === "login.html" )
    loadPage(page.header.url , page.header.element)   


    
if( getPage() ==='dashboard.html' ||
    getPage() ==='update.html' ||
    getPage() ==='no-advert.html' ||
    getPage() ==='post.html' 
    )
    loadPage(page.authHeader.url , page.authHeader.element) 

if( getPage() ==='dashboard.html' &&
    getPage() ==='flat.html'
    )
    loadPage(page.authHeader.url , page.authHeader.element) 

if( getPage() ==='update.html')
    loadPage(page.update.url , page.update.element) 
    


if( getPage() ==='post.html')
    loadPage(page.form.url , page.form.element)


