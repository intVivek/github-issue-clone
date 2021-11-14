import React, { useState, useRef, useCallback, useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import './IssuePage.scss';
import IssueBox from '../../components/IssueBox/IssueBox.js'
import Header  from '../../components/Header/Header';
import { useNavigate } from "react-router-dom";

export default function IssuePage() {
	const observer = useRef();
	let navigate = useNavigate();
	const [pageNum, setPageNum] = useState(1);
	const [searchUser, setSearchUser] = useState('facebook');
	const [searchRepo, setSearchrepo] = useState('react');
	const [repoData, setRepoData] = useState();
	const { isLoading, queries, hasMore } = useFetch(pageNum, `${searchUser}/${searchRepo}`);
	const lastElementRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNum((prev) => prev + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore]
	);
		console.log(queries);
	useEffect(() => {
		document.title = `Issues · ${searchUser}/${searchRepo}`;
		navigate(`/issue?userRepo=${searchUser}/${searchRepo}`);
	}, [navigate, searchUser, searchRepo]);
	useEffect(() => {
    fetch(`https://api.github.com/repos/${searchUser}/${searchRepo}`).then( (res) => res.json()).then((data) => {
			console.log(data);
			setRepoData({
				stars: data.stargazers_count,
				watchers: data.subscribers_count,
				forks: data.forks,
			});
    })
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
console.log(queries);
	return (
			<div className="homePageMain">
				<Header searchUser={searchUser} setSearchUser={setSearchUser} searchRepo={searchRepo} setSearchrepo={setSearchrepo} repoData={repoData} />
				<div className="issuePage">
					{ queries.map((queries, index) => <IssueBox key={index} data={queries} /> )}
					<div ref={lastElementRef}></div>
					<div className="issuePageLoading">
						{
							hasMore ? "Loading..." :
							<div className="noData">
								No data Found<br />
								Search like Username/Repository. Example facebook/react-native , microsoft/vscode
							</div>
						}
					</div>
				</div>
			</div>
	);
}
