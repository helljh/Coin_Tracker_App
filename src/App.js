import{useState, useEffect} from "react";

function App(){
    const[loading, setLoading] = useState(true);
    const [coins, setCoins]=useState([]);
    const [cost,setCost] =useState(1);
    const [need, setNeed] = useState(1);
    const onChange=(event)=>{
        setCost(event.target.value);
       
    }
    const handleInput = (event) =>{
        setNeed(event.target.value);
        
    }
    useEffect(()=>{
        fetch(" https://api.coinpaprika.com/v1/tickers")
        .then((response)=>response.json())
        .then((json)=>{
            setCoins(json);
            setLoading(false);
        });
    }, []);
    return (
        <div>
            <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
             {loading ? <strong>Loading...</strong> : <select onChange={onChange}>
                {coins.map((coin, index)=>
                <option 
                    key={index} 
                    value={coin.quotes.USD.price} 
                    >
                    {coin.name} ({coin.symbol}) : ${(coin.quotes.USD.price).toFixed(2)} USD
                </option>)}
            </select>}
            <div>
            <input type="number" value={need} onChange={handleInput} placeholder="Write dollar"></input>
            </div>
            <h2> {(need/cost).toFixed(3)}</h2>
        </div>
    ) 
}

export default App;
