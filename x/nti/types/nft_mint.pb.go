// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: nti/nft_mint.proto

package types

import (
	fmt "fmt"
	proto "github.com/gogo/protobuf/proto"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type NftMint struct {
	ReservedKey     string `protobuf:"bytes,1,opt,name=reservedKey,proto3" json:"reservedKey,omitempty"`
	TransactionHash string `protobuf:"bytes,2,opt,name=transactionHash,proto3" json:"transactionHash,omitempty"`
	TokenUri        string `protobuf:"bytes,3,opt,name=tokenUri,proto3" json:"tokenUri,omitempty"`
	TokenId         string `protobuf:"bytes,4,opt,name=tokenId,proto3" json:"tokenId,omitempty"`
}

func (m *NftMint) Reset()         { *m = NftMint{} }
func (m *NftMint) String() string { return proto.CompactTextString(m) }
func (*NftMint) ProtoMessage()    {}
func (*NftMint) Descriptor() ([]byte, []int) {
	return fileDescriptor_9edaeb5b2adb602a, []int{0}
}
func (m *NftMint) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *NftMint) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_NftMint.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *NftMint) XXX_Merge(src proto.Message) {
	xxx_messageInfo_NftMint.Merge(m, src)
}
func (m *NftMint) XXX_Size() int {
	return m.Size()
}
func (m *NftMint) XXX_DiscardUnknown() {
	xxx_messageInfo_NftMint.DiscardUnknown(m)
}

var xxx_messageInfo_NftMint proto.InternalMessageInfo

func (m *NftMint) GetReservedKey() string {
	if m != nil {
		return m.ReservedKey
	}
	return ""
}

func (m *NftMint) GetTransactionHash() string {
	if m != nil {
		return m.TransactionHash
	}
	return ""
}

func (m *NftMint) GetTokenUri() string {
	if m != nil {
		return m.TokenUri
	}
	return ""
}

func (m *NftMint) GetTokenId() string {
	if m != nil {
		return m.TokenId
	}
	return ""
}

func init() {
	proto.RegisterType((*NftMint)(nil), "nti.nti.NftMint")
}

func init() { proto.RegisterFile("nti/nft_mint.proto", fileDescriptor_9edaeb5b2adb602a) }

var fileDescriptor_9edaeb5b2adb602a = []byte{
	// 191 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x12, 0xca, 0x2b, 0xc9, 0xd4,
	0xcf, 0x4b, 0x2b, 0x89, 0xcf, 0xcd, 0xcc, 0x2b, 0xd1, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17, 0x62,
	0xcf, 0x2b, 0xc9, 0xd4, 0xcb, 0x2b, 0xc9, 0x54, 0xea, 0x66, 0xe4, 0x62, 0xf7, 0x4b, 0x2b, 0xf1,
	0xcd, 0xcc, 0x2b, 0x11, 0x52, 0xe0, 0xe2, 0x2e, 0x4a, 0x2d, 0x4e, 0x2d, 0x2a, 0x4b, 0x4d, 0xf1,
	0x4e, 0xad, 0x94, 0x60, 0x54, 0x60, 0xd4, 0xe0, 0x0c, 0x42, 0x16, 0x12, 0xd2, 0xe0, 0xe2, 0x2f,
	0x29, 0x4a, 0xcc, 0x2b, 0x4e, 0x4c, 0x2e, 0xc9, 0xcc, 0xcf, 0xf3, 0x48, 0x2c, 0xce, 0x90, 0x60,
	0x02, 0xab, 0x42, 0x17, 0x16, 0x92, 0xe2, 0xe2, 0x28, 0xc9, 0xcf, 0x4e, 0xcd, 0x0b, 0x2d, 0xca,
	0x94, 0x60, 0x06, 0x2b, 0x81, 0xf3, 0x85, 0x24, 0xb8, 0xd8, 0xc1, 0x6c, 0xcf, 0x14, 0x09, 0x16,
	0xb0, 0x14, 0x8c, 0xeb, 0xa4, 0x79, 0xe2, 0x91, 0x1c, 0xe3, 0x85, 0x47, 0x72, 0x8c, 0x0f, 0x1e,
	0xc9, 0x31, 0x4e, 0x78, 0x2c, 0xc7, 0x70, 0xe1, 0xb1, 0x1c, 0xc3, 0x8d, 0xc7, 0x72, 0x0c, 0x51,
	0xfc, 0x20, 0x4f, 0x54, 0xe8, 0x83, 0xc8, 0x92, 0xca, 0x82, 0xd4, 0xe2, 0x24, 0x36, 0xb0, 0x47,
	0x8c, 0x01, 0x01, 0x00, 0x00, 0xff, 0xff, 0x00, 0x6c, 0x43, 0x44, 0xde, 0x00, 0x00, 0x00,
}

func (m *NftMint) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *NftMint) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *NftMint) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.TokenId) > 0 {
		i -= len(m.TokenId)
		copy(dAtA[i:], m.TokenId)
		i = encodeVarintNftMint(dAtA, i, uint64(len(m.TokenId)))
		i--
		dAtA[i] = 0x22
	}
	if len(m.TokenUri) > 0 {
		i -= len(m.TokenUri)
		copy(dAtA[i:], m.TokenUri)
		i = encodeVarintNftMint(dAtA, i, uint64(len(m.TokenUri)))
		i--
		dAtA[i] = 0x1a
	}
	if len(m.TransactionHash) > 0 {
		i -= len(m.TransactionHash)
		copy(dAtA[i:], m.TransactionHash)
		i = encodeVarintNftMint(dAtA, i, uint64(len(m.TransactionHash)))
		i--
		dAtA[i] = 0x12
	}
	if len(m.ReservedKey) > 0 {
		i -= len(m.ReservedKey)
		copy(dAtA[i:], m.ReservedKey)
		i = encodeVarintNftMint(dAtA, i, uint64(len(m.ReservedKey)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintNftMint(dAtA []byte, offset int, v uint64) int {
	offset -= sovNftMint(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *NftMint) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.ReservedKey)
	if l > 0 {
		n += 1 + l + sovNftMint(uint64(l))
	}
	l = len(m.TransactionHash)
	if l > 0 {
		n += 1 + l + sovNftMint(uint64(l))
	}
	l = len(m.TokenUri)
	if l > 0 {
		n += 1 + l + sovNftMint(uint64(l))
	}
	l = len(m.TokenId)
	if l > 0 {
		n += 1 + l + sovNftMint(uint64(l))
	}
	return n
}

func sovNftMint(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozNftMint(x uint64) (n int) {
	return sovNftMint(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *NftMint) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowNftMint
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: NftMint: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: NftMint: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ReservedKey", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowNftMint
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthNftMint
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthNftMint
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.ReservedKey = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field TransactionHash", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowNftMint
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthNftMint
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthNftMint
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.TransactionHash = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field TokenUri", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowNftMint
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthNftMint
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthNftMint
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.TokenUri = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field TokenId", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowNftMint
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthNftMint
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthNftMint
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.TokenId = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipNftMint(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthNftMint
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipNftMint(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowNftMint
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowNftMint
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowNftMint
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthNftMint
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupNftMint
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthNftMint
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthNftMint        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowNftMint          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupNftMint = fmt.Errorf("proto: unexpected end of group")
)
