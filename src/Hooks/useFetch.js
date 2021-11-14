import  { useState, useEffect } from "react";

const useFetch=(pageNum,q)=> {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [queries, setQueries] = useState([]);
  const [hasMore, setHasMore] = useState(false);


  useEffect(() => {
    setQueries([])
  }, [q]);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    var url = 'https://api.github.com/repos/'+q+'/issues?page='+pageNum;
    fetch(url).then( (response) => {
      return response.json(response);
    }).then( (data) => {
      console.log(data);
      if(Array.isArray(data)){
        setQueries((oldProducts) => [...oldProducts, ...data]);
        data.length&&setHasMore(true);
        setIsLoading(false);
      }
      else{
        setHasMore(false);
      }
    }).catch((error) => {
      console.error(error);
      setError(true)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum,q]);

  return { isLoading, error, queries, hasMore };
}

export default useFetch;