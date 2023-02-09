import { ref, Ref, watch } from 'vue';
import { blockchainOpts } from '../const';

export default function useAddress(chain: Ref<number>) {
    const addrPrefix = ref("")

    const setAddrPrefix = () => {
        for (const blockchainOpt of blockchainOpts) {
            if (blockchainOpt.value == chain.value) {
                addrPrefix.value = blockchainOpt.prefix
                break;
            }
        }
    }

    watch(chain, setAddrPrefix)

    const removePrefix = (value: any) => {
        value = value ? value : ""
        return value.startsWith(addrPrefix.value) ? value.slice(addrPrefix.value.length) : value
    }

    const addPrefix = (value: any) => {
        return addrPrefix.value + value
    }

    const isAddrDisabled = () => {
        let bool = Number.isNaN(chain.value) ? true : false
        return bool
    }

    return {
        addrPrefix,
        removePrefix,
        addPrefix,
        isAddrDisabled,
    }
}