package enum

type TransferStatus int

const (
	Reserved TransferStatus = iota
	Confirmed
	Expired
	Waiting
	Completed
)

var PrevTransferStatus = map[TransferStatus]TransferStatus{
	Confirmed: Reserved,
	Expired:   Reserved,
	Waiting:   Confirmed,
	Completed: Waiting,
}

func (s TransferStatus) String() string {
	switch s {
	case Reserved:
		return "Reserved"
	case Confirmed:
		return "Confirmed"
	case Expired:
		return "Expired"
	case Waiting:
		return "Waiting"
	case Completed:
		return "Completed"
	default:
		return "Unknown"
	}
}
