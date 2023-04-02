import './App.css';

function App() {

  let cityName = "";
  let data = "";
  let description = "";
  let temp = "";
  let ListIcon =
  [
      {
        type: "Clear",
        img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
      },
      {
        type: "Rain",
        img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
      },
      {
        type: "Snow",
        img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
      },
      {
        type: "Clouds",
        img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
      },
      {
        type: "Haze",
        img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
      },
      {
        type: "Smoke",
        img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
      },
      {
        type: "Mist",
        img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
      },
      {
        type: "Drizzle",
        img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
      },
    ]

  async function getInfo(){
    cityName = document.getElementById('input').value;
    let APIString = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=53d2b9e5ffc4c41135c1487777c28306`;
    data = await getData(APIString);
    if (data['cod'] === '404'){
      document.getElementById('cityName').innerHTML = "";
      document.getElementById('description').innerHTML = "";
      document.getElementById('temp').innerHTML = "";
      document.getElementById('icon').classList.add('notFound');
      document.getElementById('description').innerHTML = "Not found!";
    } else {
      document.getElementById('cityName').innerHTML = data['name'];
      document.getElementById('description').innerHTML = data['weather'][0]['main'];
      document.getElementById('temp').innerHTML = data['main']['temp'];
      const el = document.createElement("div");
      el.classList.add("degree");
      el.textContent = "o";
      document.getElementById('temp').append(el);
      document.getElementById('temp').append("C");
      let iconImg = "";
      ListIcon.forEach(el => {
        if (data['weather'][0]['main'] === el['type']) iconImg = el['img']
      })
      document.getElementById('icon').innerHTML = `<img src='${iconImg}'></img>`;
    }
  }

  async function inputOnKeyDown(event) {
    if (event.key === "Enter") {
      document.getElementById('main').classList.add('showAni');
      setInterval(() => {
        getInfo();
      }, 1000);
    }
  }

  function searchOnClick(){
    document.getElementById('main').classList.add('showAni');
    getInfo();
  }

  async function getData(api){
    let data = await fetch(api);
    let jsonData = await data.json();
    if (jsonData.statusCode === 404) {
      return "Not found";
    } else {
      return jsonData;
    }
  }

  return (
    <div className="App">
      <div className="main" id='main'>
        <div className='search-bar'>
          <input id='input' onKeyDown={inputOnKeyDown}></input>
          <div className='serch-icon' onClick={searchOnClick}></div>
        </div>
        <div className="city-name" id='cityName'></div>
        <div className="icon" id='icon'></div>
        <div className="description" id='description'>{description}</div>
        <div className="temp" id='temp'>{temp}</div>
      </div>
    </div>
  );
}

export default App;
