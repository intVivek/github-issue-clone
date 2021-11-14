import './IssueBox.scss';
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Target } from '../Header/icon/target.svg';
import { ReactComponent as Comment } from '../Header/icon/comment.svg';

const IssueBox = (props) =>{
  const { title, number: issueID, user, comments } = props.data;
  let navigate = useNavigate(),
    location = useLocation(),
		query = new URLSearchParams(location.search),
		userRepo = query.get('userRepo');
  
  const openIssueHandler=()=>{
    navigate(`/detail?userRepo=${userRepo}&id=${props.data.number}`);
  }

  return(
    <div className="issueBox" onClick={openIssueHandler}>
      <div className="head">
        <Target className="icon" />
        <h3 className="label">{title}</h3>
        
      </div>
      <div className="tail">
        <p className="label">{`#${issueID} opened by ${user.login}`}</p>
        <div className="comments">
          <Comment className="icon" />
          {comments}
        </div>
      </div>
    </div>
  );
}

export default IssueBox;