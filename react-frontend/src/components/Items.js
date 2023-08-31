import { useState, useEffect } from "react"
import ItemCard from "./ItemCard";



function Items()  {

    const [items, setItems] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [titleFilter, setTitleFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(pageNo + 1);
    const [error, setError]=useState("");

    const [numOfPages, setNumOfPages] = useState();


    const numberOfPages = () => {
      fetch("http://127.0.0.1:8000/api/items/")
      .then(response => {
        if(!response.ok){
          throw new Error("Error in request");
        }
        return response.json();
      })
      .then((data) => {
        let x = data.length;
        setNumOfPages(Math.ceil(x/10));
        console.log(x)
      }) 
    }

    const apiget = (pageNo) => {
      console.log("fetching page ", pageNo);
      fetch(`http://127.0.0.1:8000/api/items/?pageNumber=${pageNo}`)
        .then(response => {
          if(!response.ok){
            let err = new Error("Error in request");
            err.responseem = response;
            err.name="customer error";
            throw err;
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data: ", data);
          setItems([...data]);
          console.log("Items: ",items);
          console.log("Number of pages: ", numOfPages)
          //update next and prev pages
          console.log("next page: ", nextPage);
          console.log("previous page: ", prevPage);
          if(pageNo === numOfPages){
            setNextPage(null);
          } else {
            setNextPage(pageNo+1);
          }
          if(pageNo === 1){
            setPrevPage(null);
          } else {
            setPrevPage(pageNo-1);
          }
          setPageNo(nextPage);

        })
        .catch(err => {
          console.log("ERROR: ", err.name, err.message);
          if (err.name === "Custom error") setError(err.name + err.message +err.responsem.statusText)
          else setError(err.name + err.message);
        })
    }

    useEffect(() => {
      apiget(pageNo)
      numberOfPages()
    }, []);

    return(
      <div>
        <div className="item-container">
          <div className="items-space">
            {items.map((item, index) => ( 
                <ItemCard className="column" key={item.id.toString()} item={item}/>
              
            ))}
          </div>
        </div>
          <div className="button-container">
            {prevPage && <button className="button-prev" onClick={() => apiget(prevPage)}>Previous Page</button>}
            {nextPage && <button className="button-next" onClick={() => apiget(nextPage)}>Next Page</button>}
          </div>
      </div>
    )
}
export default Items;




/*const getItems = async (pageNo) => {
  let request = fetch(`http://127.0.0.1:8000/api/items/?pageNumber=${pageNo}`
  );
  console.log(request)
  return request;
};*/

/*
const getItems = async (pageNo) => {
  fetch(`http://127.0.0.1:8000/api/items/?pageNumber=${pageNo}`)
  .then(resposne => {
    if(!resposne.ok){
      console.log("Fuckthis");
      throw new Error("error in request");
    }
    return resposne.json();
  })
}*/