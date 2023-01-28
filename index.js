const weather = {
    apiKey : "7c6df6c4626efe7883e21fbed3b21623",
    fetchWeather : function(city){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
            .then(obj=>{
                if(!obj.ok){
                    throw("invalid city !!!");
                }
                return obj.json()
            })
            .then(data=>{
                this.getData(data);
            })
            .catch((err)=>{
                alert(err);
            })
    },
    getData : function(obj){
        // console.log(obj);
        const {name , visibility} = obj;
        const {temp, humidity} = obj.main;
        const {speed} = obj.wind;
        const {icon , description} = obj.weather[0];
        document.querySelector("#state").innerText = name;
        document.querySelector("img").src =`https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector("h2").innerText = `${temp}  °C`;
        document.querySelector("#humidity").innerText = `humidity : ${humidity}`;
        document.querySelector("#speed").innerText = `speed : ${speed} km/h`;
        document.querySelector("#visible").innerText = `visibility : ${visibility}`;
        document.querySelector("#desc").innerText = `description : ${description}`;
        document.querySelector(".info").classList.remove("loading");
        document.body.style.backgroundImage= `url(https://source.unsplash.com/1200x1200/?${name})`;
        document.querySelector("input").value="";
    } , 
    search : function(){
        let city = document.querySelector("input").value;
        this.fetchWeather(city);
    }
};
const form = document.querySelector("form");
form.addEventListener("submit" , (e)=>{
    e.preventDefault();
    weather.search();
})
weather.fetchWeather("punjab");