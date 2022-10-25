import { useState, useEffect } from "react";

import Body from "./components/Body";
import Navbar from "./components/Navbar";
import { indexerClient, myAlgoConnect } from "./utils/constants";
import Cover from "./components/Cover";

import {
	addFlowerAction,
	buyFlowerAction,
	editQuantityAction,
	getFlowersAction,
} from "./utils/floral";

function App() {
	const [address, setAddress] = useState(null);
	const [balance, setBalance] = useState(0);
	const [flowers, setFlowers] = useState([]);

	const fetchBalance = async (accountAddress) => {
		indexerClient
			.lookupAccountByID(accountAddress)
			.do()
			.then((response) => {
				const _balance = response.account.amount;
				setBalance(_balance);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const connectWallet = async () => {
		myAlgoConnect
			.connect()
			.then((accounts) => {
				const _account = accounts[0];
				console.log(_account);
				setAddress(_account.address);
				fetchBalance(_account.address);
				getFlowers();
			})
			.catch((error) => {
				console.log("Could not connect to MyAlgo wallet");
				console.error(error);
			});
	};

	const buyFlower = async (flower) => {
		buyFlowerAction(address, flower)
			.then(() => {
				getFlowers();
				fetchBalance(address);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const editQuantity = async (flower, _quantity) => {
		editQuantityAction(address, flower, _quantity)
			.then(() => {
				getFlowers();
				fetchBalance(address);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getFlowers = async () => {
		getFlowersAction()
			.then((flowers) => {
				if (flowers) {
					setFlowers(flowers);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const addFlower = async (data) => {
		addFlowerAction(address, data)
			.then(() => {
				getFlowers();
				fetchBalance(address);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			{address ? (
				<div>
					<Navbar balance={balance} />
					<Body
						address={address}
						addFlower={addFlower}
						flowers={flowers}
						buyFlowers={buyFlower}
						editQuantity={editQuantity}
					/>
				</div>
			) : (
				<Cover
					name={"Floral Art"}
					coverImg={
						"https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
					}
					connect={connectWallet}
				/>
			)}
		</>
	);
}

export default App;
