const addInfo = (res) => {
    const gallery = document.querySelector(".profile");
    let html = "";
        html += `

        <div class="profile-image">

            <img src="${res.profile_image.medium}" alt="">

        </div>

        <div class="profile-user-settings">

            <h1 class="profile-user-name">${res.username}</h1>

        </div>

        <div class="profile-stats">

            <ul>
                <li><span class="profile-stat-count">${res.total_photos}</span> posts</li>
                <li><span class="profile-stat-count">${res.followers_count}</span> followers</li>
                <li><span class="profile-stat-count">${res.followers_count}</span> following</li>
            </ul>

        </div>

        <div class="profile-bio">

            <p><span class="profile-real-name">${res.first_name}</span>${res.bio} </p>

        </div>

  
 `;
    gallery.innerHTML = html;
};
const photo = (res) => {
    const gallery = document.querySelector(".gallery");
    let html = "";
    res.forEach((element) => {
    html += `
			<div class="gallery-item" >

				<img src="${element.urls.small}" class="gallery-image" alt="">

				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i>${element.likes}</li>
					</ul>

				</div>

			</div>
 `;
    });
    gallery.innerHTML = html;
};

const callAPI = async (username) => {
    try {
        console.log("Username --> ", username);
        const response = await fetch("/api/searchUser", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username
            }),
        });
        const res = await response.json();
        //check response return from our API
        console.log("response ----> ", res);
        addInfo(res);
        
    } catch (error) {
        console.log("message error --->", error);
        //Do Something
    }
};
const callAPI2 = async (username) => {
    try {
        console.log("Username --> ", username);
        const response = await fetch("/api/userphoto", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username
            }),
        });
        const res = await response.json();
        //check response return from our API
        console.log("response ----> ", res);
        photo(res);

    } catch (error) {
        console.log("message error --->", error);
        //Do Something
    }
};

//รับค่า
const main = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username')
    if (urlParams.has('username')) {
        //console.log(username);
        callAPI(username)
        callAPI2(username)

    } else {
        console.log(err);
    }
};

main();
