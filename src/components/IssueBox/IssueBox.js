import './IssueBox.scss';
import { useNavigate } from "react-router-dom";
import { ReactComponent as Target } from '../Header/icon/target.svg';

const IssueBox = (props) =>{
  const { title, number: issueID } = props.data;
  let navigate = useNavigate();
  
  const openIssueHandler=()=>{
    navigate("/detail?id="+props.data.number);
  }

  return(
    <div className="issueBox" onClick={openIssueHandler}>
      <div className="head">
        <Target className="icon" />
        <h3 className="label">{title}</h3>
      </div>
      <div className="tail">
        <h3 className="label">{`#${issueID}`}</h3>
      </div>
    </div>
  );
}

export default IssueBox;