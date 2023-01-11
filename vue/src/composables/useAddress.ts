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

    return {
        addrPrefix
    }
}