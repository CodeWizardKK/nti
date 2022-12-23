import { txClient, queryClient, MissingWalletError , registry} from './module'

import { NftMint } from "./module/types/nti/nft_mint"
import { NftTransfer } from "./module/types/nti/nft_transfer"
import { NftTransferStatus } from "./module/types/nti/nft_transfer_status"
import { NftTransferStatusDetail } from "./module/types/nti/nft_transfer_status_detail"
import { Params } from "./module/types/nti/params"
import { ReservedNftTransfer } from "./module/types/nti/reserved_nft_transfer"


export { NftMint, NftTransfer, NftTransferStatus, NftTransferStatusDetail, Params, ReservedNftTransfer };

async function initTxClient(vuexGetters) {
	return await txClient(vuexGetters['common/wallet/signer'], {
		addr: vuexGetters['common/env/apiTendermint']
	})
}

async function initQueryClient(vuexGetters) {
	return await queryClient({
		addr: vuexGetters['common/env/apiCosmos']
	})
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

function getStructure(template) {
	let structure = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field: any = {}
		field.name = key
		field.type = typeof value
		structure.fields.push(field)
	}
	return structure
}

const getDefaultState = () => {
	return {
				Params: {},
				NftTransfer: {},
				NftTransferAll: {},
				ReservedNftTransfer: {},
				ReservedNftTransferAll: {},
				NftTransferStatus: {},
				NftMint: {},
				NftMintAll: {},
				NftTransferStatusOfToken: {},
				NftTransferStatusOfAddress: {},
				
				_Structure: {
						NftMint: getStructure(NftMint.fromPartial({})),
						NftTransfer: getStructure(NftTransfer.fromPartial({})),
						NftTransferStatus: getStructure(NftTransferStatus.fromPartial({})),
						NftTransferStatusDetail: getStructure(NftTransferStatusDetail.fromPartial({})),
						Params: getStructure(Params.fromPartial({})),
						ReservedNftTransfer: getStructure(ReservedNftTransfer.fromPartial({})),
						
		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				getParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Params[JSON.stringify(params)] ?? {}
		},
				getNftTransfer: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.NftTransfer[JSON.stringify(params)] ?? {}
		},
				getNftTransferAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.NftTransferAll[JSON.stringify(params)] ?? {}
		},
				getReservedNftTransfer: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ReservedNftTransfer[JSON.stringify(params)] ?? {}
		},
				getReservedNftTransferAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ReservedNftTransferAll[JSON.stringify(params)] ?? {}
		},
				getNftTransferStatus: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.NftTransferStatus[JSON.stringify(params)] ?? {}
		},
				getNftMint: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.NftMint[JSON.stringify(params)] ?? {}
		},
				getNftMintAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.NftMintAll[JSON.stringify(params)] ?? {}
		},
				getNftTransferStatusOfToken: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.NftTransferStatusOfToken[JSON.stringify(params)] ?? {}
		},
				getNftTransferStatusOfAddress: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.NftTransferStatusOfAddress[JSON.stringify(params)] ?? {}
		},
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: nti.nti initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new Error('Subscriptions: ' + e.message)
				}
			})
		},
		
		
		
		 		
		
		
		async QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryParams()).data
				
					
				commit('QUERY', { query: 'Params', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryParams', payload: { options: { all }, params: {...key},query }})
				return getters['getParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryParams API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryNftTransfer({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryNftTransfer( key.index)).data
				
					
				commit('QUERY', { query: 'NftTransfer', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryNftTransfer', payload: { options: { all }, params: {...key},query }})
				return getters['getNftTransfer']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryNftTransfer API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryNftTransferAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryNftTransferAll(query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryNftTransferAll({...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'NftTransferAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryNftTransferAll', payload: { options: { all }, params: {...key},query }})
				return getters['getNftTransferAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryNftTransferAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryReservedNftTransfer({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryReservedNftTransfer( key.reservedKey)).data
				
					
				commit('QUERY', { query: 'ReservedNftTransfer', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryReservedNftTransfer', payload: { options: { all }, params: {...key},query }})
				return getters['getReservedNftTransfer']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryReservedNftTransfer API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryReservedNftTransferAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryReservedNftTransferAll(query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryReservedNftTransferAll({...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'ReservedNftTransferAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryReservedNftTransferAll', payload: { options: { all }, params: {...key},query }})
				return getters['getReservedNftTransferAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryReservedNftTransferAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryNftTransferStatus({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryNftTransferStatus()).data
				
					
				commit('QUERY', { query: 'NftTransferStatus', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryNftTransferStatus', payload: { options: { all }, params: {...key},query }})
				return getters['getNftTransferStatus']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryNftTransferStatus API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryNftMint({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryNftMint( key.reservedKey)).data
				
					
				commit('QUERY', { query: 'NftMint', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryNftMint', payload: { options: { all }, params: {...key},query }})
				return getters['getNftMint']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryNftMint API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryNftMintAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryNftMintAll(query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryNftMintAll({...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'NftMintAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryNftMintAll', payload: { options: { all }, params: {...key},query }})
				return getters['getNftMintAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryNftMintAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryNftTransferStatusOfToken({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryNftTransferStatusOfToken( key.chain,  key.contractAddr,  key.tokenId, query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryNftTransferStatusOfToken( key.chain,  key.contractAddr,  key.tokenId, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'NftTransferStatusOfToken', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryNftTransferStatusOfToken', payload: { options: { all }, params: {...key},query }})
				return getters['getNftTransferStatusOfToken']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryNftTransferStatusOfToken API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryNftTransferStatusOfAddress({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryNftTransferStatusOfAddress( key.chain,  key.walletAddr, query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryNftTransferStatusOfAddress( key.chain,  key.walletAddr, {...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'NftTransferStatusOfAddress', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryNftTransferStatusOfAddress', payload: { options: { all }, params: {...key},query }})
				return getters['getNftTransferStatusOfAddress']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryNftTransferStatusOfAddress API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgUpdateNftMint({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgUpdateNftMint(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateNftMint:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateNftMint:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgTransferNft({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgTransferNft(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgTransferNft:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgTransferNft:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgReserveNftTransfer({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgReserveNftTransfer(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgReserveNftTransfer:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgReserveNftTransfer:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDeleteNftMint({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgDeleteNftMint(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteNftMint:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDeleteNftMint:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgChangeStatus({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgChangeStatus(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgChangeStatus:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgChangeStatus:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateNftMint({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateNftMint(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateNftMint:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateNftMint:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgUpdateNftMint({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgUpdateNftMint(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateNftMint:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateNftMint:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgTransferNft({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgTransferNft(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgTransferNft:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgTransferNft:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgReserveNftTransfer({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgReserveNftTransfer(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgReserveNftTransfer:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgReserveNftTransfer:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDeleteNftMint({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgDeleteNftMint(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteNftMint:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDeleteNftMint:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgChangeStatus({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgChangeStatus(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgChangeStatus:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgChangeStatus:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateNftMint({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateNftMint(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateNftMint:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateNftMint:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}
