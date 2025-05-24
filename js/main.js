const users = [
  {
    avtar: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Aisha Roy",
    contact: "aisha.roy@devmail.com",
    coverPage: "https://picsum.photos/id/1011/600/300",
    heading: "EcoMarket App",
    description: "Marketplace for eco-friendly and sustainable products."
  },
  {
    avtar: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Sneha Patel",
    contact: "sneha.patel@webgen.com",
    coverPage: "https://picsum.photos/id/1012/600/300",
    heading: "SmartPlant Monitor",
    description: "An IoT-based app to monitor and care for your plants."
  },
  {
    avtar: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Ritika Mehra",
    contact: "ritika.mehra@appzone.com",
    coverPage: "https://picsum.photos/id/1013/600/300",
    heading: "CollegeMate",
    description: "A platform to connect college students for study and fun."
  },
  {
    avtar: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Tanvi Joshi",
    contact: "tanvi.joshi@coderhub.com",
    coverPage: "https://picsum.photos/id/1014/600/300",
    heading: "FitFusion",
    description: "Hybrid app blending yoga, workouts, and mindfulness."
  },
  {
    avtar: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Avni Desai",
    contact: "avni.desai@projectverse.io",
    coverPage: "https://picsum.photos/id/1015/600/300",
    heading: "SafeRide",
    description: "Women’s safety tracking and alert app with live location."
  },
  {
    avtar: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Megha Kapoor",
    contact: "megha.kapoor@studioapp.dev",
    coverPage: "https://picsum.photos/id/1016/600/300",
    heading: "Mood Journal",
    description: "A simple and colorful mood tracker with daily prompts."
  },
  {
    avtar: "https://randomuser.me/api/portraits/women/7.jpg",
    name: "Priya Singh",
    contact: "priya.singh@gridly.app",
    coverPage: "https://picsum.photos/id/1017/600/300",
    heading: "FoodSnap AI",
    description: "Snap food pics and get calorie estimates with AI!"
  },
  {
    avtar: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Ananya Iyer",
    contact: "ananya.iyer@buildboard.dev",
    coverPage: "https://picsum.photos/id/1018/600/300",
    heading: "BuildBoard",
    description: "Kanban-style productivity board with habit tracking."
  },
  {
    avtar: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Jiya Malik",
    contact: "jiya.malik@learnhub.org",
    coverPage: "https://picsum.photos/id/1019/600/300",
    heading: "QuizQuest",
    description: "Gamified quiz platform with customizable categories."
  },
  {
    avtar: "https://randomuser.me/api/portraits/women/10.jpg",
    name: "Nikita Arora",
    contact: "nikita.arora@devlab.com",
    coverPage: "https://picsum.photos/id/1020/600/300",
    heading: "MindMaze",
    description: "Challenging puzzle game with multiplayer battles."
  },
  // More female users
  ...Array.from({ length: 18 }, (_, i) => ({
    avtar: `https://randomuser.me/api/portraits/women/${11 + i}.jpg`,
    name: `Female User ${i + 11}`,
    contact: `female${i + 11}@dummy.io`,
    coverPage: `https://picsum.photos/id/${1021 + i}/600/300`,
    heading: `Project ${i + 11}X`,
    description: `A creative web or mobile app solving issue ${i + 11}.`
  })),
  // Male users
  {
    avtar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Rohit Jain",
    contact: "rohit.jain@launchzone.com",
    coverPage: "https://picsum.photos/id/1050/600/300",
    heading: "CryptoTrack",
    description: "Crypto price alerts and wallet tracker for investors."
  },
  {
    avtar: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Aarav Singh",
    contact: "aarav.singh@edufy.app",
    coverPage: "https://picsum.photos/id/1051/600/300",
    heading: "Edufy",
    description: "Live quiz app to make learning fast and competitive."
  },
  {
    avtar: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Dev Sharma",
    contact: "dev.sharma@toolkit.dev",
    coverPage: "https://picsum.photos/id/1052/600/300",
    heading: "DevToolkit",
    description: "Chrome extension for developers – tools at your fingertips."
  },
  {
    avtar: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Yash Verma",
    contact: "yash.verma@productdeck.io",
    coverPage: "https://picsum.photos/id/1053/600/300",
    heading: "ProductDeck",
    description: "SaaS tool to track feedback and manage roadmaps."
  },
  {
    avtar: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Kunal Batra",
    contact: "kunal.batra@vidsync.live",
    coverPage: "https://picsum.photos/id/1054/600/300",
    heading: "VidSync",
    description: "Watch YouTube & Netflix together with friends online."
  },
  // More male users
  ...Array.from({ length: 7 }, (_, i) => ({
    avtar: `https://randomuser.me/api/portraits/men/${6 + i}.jpg`,
    name: `Male User ${i + 6}`,
    contact: `male${i + 6}@dummy.io`,
    coverPage: `https://picsum.photos/id/${1055 + i}/600/300`,
    heading: `ToolX Project ${i + 6}`,
    description: `Tool ${i + 6} to automate or improve digital workflows.`
  }))
];

function makeCard(user){
    let projectCard = document.createElement('article');
        projectCard.className = `project-card`;
        projectCard.innerHTML = `
            <div class="card-header">
                            <div class="author">
                                <img src=${user['avtar']} alt="Author" class="avatar">
                                <div class="author-info">
                                    <h4>${user['name']}</h4>
                                    <span>${user['contact']}</span>
                                </div>
                            </div>
                            <button class="more-btn">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                        </div>
                        <div class="project-preview">
                            <img src=${user['coverPage']} alt="coverPage" class="coverPage">
                        </div>
                        <div class="project-info">
                            <h3>${user['heading']}</h3>
                            <p>${user['description']}</p>
                            <div class="tech-stack">
                                <span class="tech-tag">React Native</span>
                                <span class="tech-tag">Firebase</span>
                                <span class="tech-tag">WebRTC</span>
                            </div>
                            <div class="social-metrics comment">
                                <button class="metric-btn">
                                    <i class="far fa-comment"></i>
                                    <span>0</span>
                                </button>
                                <button class="metric-btn retweet">
                                    <i class="fas fa-retweet"></i>
                                    <span>0</span>
                                </button>
                                <button class="metric-btn like">
                                    <i class="far fa-heart"></i>
                                    <span>${Math.floor(Math.random()*1000)}</span>
                                </button>
                                <button class="metric-btn">
                                    <i class="fas fa-chart-bar"></i>
                                    <span>243</span>
                                </button>
                                <button class="metric-btn share">
                                    <i class="fas fa-share"></i>
                                </button>
                                
                            </div>
        
        `
        const grid = document.getElementsByClassName('project-grid')[0];
        grid.appendChild(projectCard);
}
let shareProject= document.getElementsByClassName('new-post-btn')[0];
function createForm() {
    let form = document.createElement('form');
    form.className = "form";
    form.style.width = '40vw';  // Set width of the form
    form.style.height = '60vh';
    form.style.padding = '20px';
    // form.style.backgroundColor = '#5ac8fa'
    form.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    form.style.borderRadius = '8px';
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.gap = '10px';  // Space between form elements


    // Prevent default on submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const coverPage = document.getElementById('coverPage').value;
        const avtar = document.getElementById('avtar').value;
        const name = document.getElementById('userName').value;
        const contact = document.getElementById('userContact').value;
        const heading = document.getElementById('heading').value;
        const description = document.getElementById('description').value;

        let projectCard = document.createElement('article');
        projectCard.className = `project-card`;
        projectCard.innerHTML = `
            <div class="card-header">
                            <div class="author">
                                <img src=${avtar} alt="Author" class="avatar">
                                <div class="author-info">
                                    <h4>${name}</h4>
                                    <span>${contact}</span>
                                </div>
                            </div>
                            <button class="more-btn">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                        </div>
                        <div class="project-preview">
                            <img src=${coverPage} alt="coverPage" class="coverPage">
                        </div>
                        <div class="project-info">
                            <h3>${heading}</h3>
                            <p>${description}</p>
                            <div class="tech-stack">
                                <span class="tech-tag">React Native</span>
                                <span class="tech-tag">Firebase</span>
                                <span class="tech-tag">WebRTC</span>
                            </div>
                            <div class="social-metrics comment">
                                <button class="metric-btn">
                                    <i class="far fa-comment"></i>
                                    <span>0</span>
                                </button>
                                <button class="metric-btn retweet">
                                    <i class="fas fa-retweet"></i>
                                    <span>0</span>
                                </button>
                                <button class="metric-btn like">
                                    <i class="far fa-heart"></i>
                                    <span>0</span>
                                </button>
                                <button class="metric-btn">
                                    <i class="fas fa-chart-bar"></i>
                                    <span>243</span>
                                </button>
                                <button class="metric-btn share">
                                    <i class="fas fa-share"></i>
                                </button>
                                
                            </div>
        
        `
        const grid = document.getElementsByClassName('project-grid')[0];
        grid.prepend(projectCard);
        const projectData = {
        coverPage: document.getElementById('coverPage').value,
        avtar: document.getElementById('avtar').value,
        name: document.getElementById('userName').value,
        contact: document.getElementById('userContact').value,
        heading: document.getElementById('heading').value,
        description: document.getElementById('description').value
        };
        users.push(projectData);
    });
    // Prevent form submission
    form.onsubmit = (event) => {
        event.preventDefault();
    };

    // Create cover page input
    let ImgLabel = document.createElement('label');
    ImgLabel.innerHTML = "Please insert cover page for your project.";
    ImgLabel.setAttribute("for", "coverPage");
    ImgLabel.style.fontWeight = 'bold';  // Make label text bold
    ImgLabel.style.color = '#333';  // Set label color
    ImgLabel.style.marginBottom = '5px'; // Add space between label and input
    let coverPage = document.createElement('input');
    coverPage.type = 'url'; // ya 'text' bhi chalega
    coverPage.id = 'coverPage';
    coverPage.placeholder = 'Enter public image URL';
    ImgLabel.appendChild(coverPage);
    form.appendChild(ImgLabel);
    // Avtar input 
    let avtarLabel = document.createElement('label');
    avtarLabel.innerHTML = "Please insert avtar" ;
    avtarLabel.setAttribute(`for`,'avtar');
    avtarLabel.style.fontWeight = 'bold';  // Make label text bold
    avtarLabel.style.color = '#333';  // Set label color
    avtarLabel.style.marginBottom = '5px'; // Add space between label and input
    let avtar = document.createElement('input');
    avtar.id = "avtar";
    avtar.type = "url";
    avtar.placeholder = `Enter your avtar`;
    form.appendChild(avtarLabel);
    form.appendChild(avtar);

    // Create user name input
    let nameLabel = document.createElement('label');
    nameLabel.setAttribute("for", "userName");
    nameLabel.innerHTML = "Your Name: ";
    nameLabel.style.fontWeight = 'bold';
    nameLabel.style.color = '#333';
    nameLabel.style.marginBottom = '5px';
    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'userName';
    nameInput.placeholder = "Enter your name";
    form.appendChild(nameLabel);
    form.appendChild(nameInput);

    // Create contact number input
    let contactLabel = document.createElement('label');
    contactLabel.setAttribute("for", "userContact");
    contactLabel.innerHTML = "Your Contact: ";
    contactLabel.style.fontWeight = 'bold';
    contactLabel.style.color = '#333';
    contactLabel.style.marginBottom = '5px';
    let contactInput = document.createElement('input');
    contactInput.type = 'tel';
    contactInput.id = 'userContact';
    contactInput.placeholder = "Enter your contact number";
    form.appendChild(contactLabel);
    form.appendChild(contactInput);

    // Create project heading input
    let projectHeading = document.createElement('label');
    projectHeading.setAttribute("for", "projectHeading");
    projectHeading.innerHTML = "Project Heading";
    projectHeading.style.fontWeight = 'bold';
    projectHeading.style.color = '#333';
    projectHeading.style.marginBottom = '5px';
    let heading = document.createElement('input');
    heading.id = "heading";
    heading.name = "projectHeading";
    heading.type = "text";
    form.appendChild(projectHeading);
    form.appendChild(heading);

    // Create description input
    let descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.innerHTML = "Description";
    descriptionLabel.style.fontWeight = 'bold';
    descriptionLabel.style.color = '#333';
    descriptionLabel.style.marginBottom = '5px';
    let description = document.createElement('textarea');
    description.id = "description";
    description.name = "description";
    description.placeholder = "Write a detailed project description...";
    description.rows = 4; // Kitni height mein dikhna chahiye
    description.style.resize = 'vertical'; // User ko size badalne do
    description.style.padding = '10px';
    description.style.fontSize = '1rem';
    description.style.borderRadius = '4px';
    description.style.border = '1px solid #ccc';

    form.appendChild(descriptionLabel);
    form.appendChild(description);



    let submitBtn = document.createElement('button');
    submitBtn.innerText = "Submit";
    submitBtn.type = 'submit';
    submitBtn.style.padding = '10px';
    submitBtn.style.backgroundColor = '#28a745';
    submitBtn.style.color = '#fff';
    submitBtn.style.border = 'none';
    submitBtn.style.cursor = 'pointer';
    form.appendChild(submitBtn);
    return form;
}



shareProject.addEventListener('click', (event) => {
    // Create the form
    const form = createForm();

    // Create the overlay to dim the background
    let overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '9998'; // Set overlay z-index below form

    // Style the form to make it appear in the center
    form.style.position = 'absolute';  // Make form relative for close button
    form.style.top = '50%';
    form.style.left = '50%';
    form.style.transform = 'translate(-50%, -50%)';
    form.style.backgroundColor = '#00aaff';
    form.style.padding = '20px';
    form.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    form.style.zIndex = '9999';
    form.style.borderRadius = '8px';


    // Create the close button
    let closeButton = document.createElement('button');
    closeButton.innerHTML = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.backgroundColor = 'red';
    closeButton.style.color = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.padding = '5px 10px';
    closeButton.style.cursor = 'pointer';

    // Remove the form and overlay when close button is clicked
    closeButton.addEventListener('click', () => {
        document.body.removeChild(form);
        document.body.removeChild(overlay);
    });

    // Append close button to the form
    form.appendChild(closeButton);

    // Append the overlay and form to the body
    document.body.appendChild(overlay);
    document.body.appendChild(form);
});

const grid = document.querySelector('.project-grid');
grid.addEventListener('click',(event)=>{
    const like = event.target.closest('.like');
    if(!like) return ;
    const icon = like.querySelector('i');
    const span = like.querySelector('span');
    let count = Number(span.textContent);
    if(icon.classList.contains('far')){
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = 'red';
        span.textContent = `${count+1}`;
    }
    else{
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
        span.textContent = `${count-1}`;
    }
})

users.forEach((user)=>{
    makeCard(user);
})
// Implementing Search Functionality 
const search = document.querySelector(".search-container .fa-search");
search.addEventListener('click', (event) => {
    const input = document.getElementById('input').value.toLowerCase().trim();
    if(input != '') {
        const ans = users.filter((user) => {
            const data = Object.values(user).map(entry => entry.toLowerCase());
            // data ke kisi bhi entry me input ka partial match check karo
            return data.some(entry => entry.includes(input));
        });
        const grid = document.getElementsByClassName("project-grid")[0];
        grid.innerHTML = '';
        ans.forEach((user) => {
            makeCard(user);
        });
    }
});
