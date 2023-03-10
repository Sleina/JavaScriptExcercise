import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";
import api from "./views/Outfits.js";
import Outfits from "./views/Outfits.js";


const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard },
        { path: "/posts", view: Posts },
        { path: "/settings", view: Settings },
        { path: "/outfits", view: Outfits },

    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    //If no match
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    //new instance
    const view = new match.route.view();

    //add innerHtml of app (id app) with the html content
    document.querySelector("#app").innerHTML = await view.getHtml();

    console.log(match.route.view);
};

//Make sure we can use history <- ->
window.addEventListener("popstate", router);

//Make sure the page does not get refreshed
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
})

document.addEventListener('DOMContentLoaded', async function() {
    const outfitsView = new Outfits();
    const outfit = await outfitsView.getOutfits();
    const outfitContainer = document.querySelector('#outfit-container');
    const outfitDiv = document.createElement('div');
    outfitDiv.innerHTML = `Top: ${outfit.top}, Jeans: ${outfit.jeans}, Shoes: ${outfit.shoes}`;
    outfitContainer.appendChild(outfitDiv);
    
});



