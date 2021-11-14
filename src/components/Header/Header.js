import './header.scss';
import { ReactComponent as Logo } from './icon/logo.svg';
import { ReactComponent as Github } from './icon/github.svg';
import { ReactComponent as Search } from './icon/search.svg';
import { ReactComponent as Eye } from './icon/eye.svg';
import { ReactComponent as Star } from './icon/star.svg';
import { ReactComponent as Fork } from './icon/fork.svg';

import { useSelector, useDispatch } from "react-redux";
import { star, watch, fork } from '../../store/action/index';

const kFormatter = (num) => {
		return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
	},
	numberWithCommas = (num) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

const Option = (props) => {
	const {className, Icon, value, active, onClick} = props;

	return (
		<div className={`option ${className} ${active ? 'active' : ''}`} onClick={onClick}>
			<div className='head'>
				<Icon className='icon' />
				<p className='text'>{`${active ? 'un' : ''}${className}`}</p>
			</div>
			<div className='tail'>{active ? numberWithCommas(value + 1) : kFormatter(value)}</div>
		</div>
	);
};

const Header = (props) => {
	const { searchUser, setSearchUser, searchRepo, setSearchrepo, repoData, subHeader } = props,
	onKeyDown = (event) => {
		if (event.key === '/') {
			
		}
	};
	const repoState = useSelector((state) => state);
	const dispatch = useDispatch();
	
	return (
		<div className="header">
			<div className="mainheader">
				<div className="logo"><Logo className="icon" /><Github className="text" /></div>
			</div>
			{
				subHeader && 
				<div className="subHeader">
				<div className="repoContainer">
					<div className="search">
						<Search className="icon" />
						<p className="label">{'Search'}</p>
					</div>
					<div className="searchContainer">
						<input className="searchUser" value={searchUser} onKeyDown={onKeyDown}
							onChange={(e) => { setSearchUser(e.target.value) }} placeholder='username' />
						<p>/</p>
						<input className="searchRepo" value={searchRepo}
							onChange={(e) => { setSearchrepo(e.target.value) }}  placeholder='repository' />
					</div>
				</div>
				<div className="optionContainer">
					<Option className='watch' Icon={Eye} value={repoData?.watchers} active={repoState.watch} onClick={() => dispatch(watch())} />
					<Option className='star' Icon={Star} value={repoData?.stars} active={repoState.star} onClick={() => dispatch(star())} />
					<Option className='fork' Icon={Fork} value={repoData?.forks} active={repoState.fork} onClick={() => dispatch(fork())} />
				</div> 
			</div>
		}
		</div>
	);
}
export default Header;