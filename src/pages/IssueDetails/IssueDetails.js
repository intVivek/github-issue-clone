import './IssueDetails.scss';
import {useState,useEffect} from 'react';
import {useLocation } from "react-router-dom";
import DetailsLoading from '../../components/DetailsLoading/DetailsLoading.js';

const IssueDetails=()=>{
  const [queryData,setQueryData] = useState();
  const [loading,setLoading] = useState(true);
  var location = useLocation();
  const query = new URLSearchParams(location.search);
  const queryId = query.get('id');
  const userRepo = query.get('userRepo');

  useEffect(() => {
    var url = 'https://api.github.com/repos/facebook/react/issues/'+queryId;
    setLoading(true);
    fetch(url).then( (response) => {
      return response.json(response);
    }).then( (data) => {
      console.log(data);
      setQueryData(data);
      setLoading(false);
    })
  }, []);

  return(
    <div className='issueDetailsPage'>
      {loading? <DetailsLoading/>:
      <div className='issueDetailsUser'>
        <img className='useImgContainer' src={queryData?.user?.avatar_url}/>
        <div className='issueDetailsTitle'>
          <h2>{"Issue : "+queryData?.title}</h2>
          <span>{"state"}&nbsp;&nbsp;&nbsp;&nbsp;{"#"+queryData?.state}</span>
          <h3>{"Name : "+queryData?.user?.login}</h3>
      </div>
      </div>}
    </div>
  );
}

export default IssueDetails;