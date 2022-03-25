const form = document.querySelector('#coinForm');
const res = document.querySelector('#tableResult');
var timer;

form.addEventListener('submit',(e)=>{

    e.preventDefault();
    if(timer){
        clearTimeout(timer);
    }

    const ctype =  form.elements.coinType.value;

    fetchPrice(ctype);

});

const fetchPrice = async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    const price = r.data.coin.price;
    const volume = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const base = r.data.coin.name;
    const target = 'USD';

    res.innerHTML = `<tr style="background-color:blue;color:white;font-weight:700">
    <td>
        Property
    </td>
    <td>
        Value
    </td>
</tr>
<tr>
    <td>
        ${base}
    </td>
    <td>${price} ${target}</td>
</tr>
<tr>
    <td>
        Volume
    </td>
    <td>${volume}</td>
</tr>
<tr>
    <td>
        Change
    </td>
    <td>${change}</td>
</tr>`;

    timer = setTimeout(()=>fetchPrice(ctype),10000);
    
}

