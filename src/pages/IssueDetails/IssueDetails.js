import './IssueDetails.scss';
import {useState,useEffect} from 'react';
import {useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import DetailsLoading from '../../components/DetailsLoading/DetailsLoading.js';
import ReactMarkdown from 'react-markdown'

const IssueDetails=()=>{
  const [queryData,setQueryData] = useState();
  const [loading,setLoading] = useState(true);
  var location = useLocation(),
    query = new URLSearchParams(location.search);
  const queryId = query.get('id');

  useEffect(() => {
    var url = `https://api.github.com/repos/${query.get('userRepo')}/issues/${queryId}`;
    setLoading(true);
    fetch(url).then( (response) => {
      return response.json(response);
    }).then( (data) => {
      console.log(data);
      setQueryData(data);
      setLoading(false);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div className='issueDetailsPage'>
      <Header />
      {
        loading? <DetailsLoading/> :
        <>
          <div className='head'>
            <div className='title'>
              <h1 className='titleText'>{queryData?.title}</h1>
            </div>
            <div className='user'>
              <p className='state'>{queryData?.state}</p>
              <img className='avatar' src={queryData?.user?.avatar_url} alt='avatar' />
              <p>{`${queryData?.user?.login} opened this issue · ${queryData.comments} comment`}</p>
            </div>
          </div>
          <div className='body'>
            <ReactMarkdown className='bodyText'>{queryData.body}</ReactMarkdown>
          </div>
        </>
      }
    </div>
  );
}

export default IssueDetails;