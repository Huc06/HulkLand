"use client";

import { useState, useEffect } from "react";
import { Button, Input, Card, Form, Upload, message, Modal, List, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useWriteContract, useReadContract, useAccount } from "wagmi";

// Thông tin contract NFT
const NFT_ADDRESS = "0xee4d34A2E2B94107bD5B45c9Ff2a01e84896263E";
const NFT_ABI = [
  {
    "inputs": [{ "internalType": "string", "name": "tokenURI", "type": "string" }],
    "name": "mintNFT",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
    "name": "getNFTsByOwner",
    "outputs": [
      { "internalType": "uint256[]", "name": "", "type": "uint256[]" },
      { "internalType": "string[]", "name": "", "type": "string[]" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// API Key Pinata
const PINATA_API_KEY = "618a283d5f893f3cc858";
const PINATA_SECRET_KEY = "e0270494527e3ea50b4d732c559575a4efdd44341459ecfb8b7dc33eb9be8720";

export default function MintNFT() {
  const [nftName, setNFTName] = useState("");
  const [nftImage, setNFTImage] = useState<File | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintedTokenId, setMintedTokenId] = useState<number | null>(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [nftList, setNFTList] = useState<{id: number; uri: string}[]>([]);

  const { address } = useAccount();

  const { data: userNFTs, refetch } = useReadContract({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    functionName: "getNFTsByOwner",
    args: [address]
  });

  const { writeContractAsync } = useWriteContract();

  const uploadToPinata = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          "pinata_api_key": PINATA_API_KEY,
          "pinata_secret_api_key": PINATA_SECRET_KEY,
        },
        body: formData
      });

      const data = await res.json();
      return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    } catch (error) {
      console.log("Upload failed");
      return null;
    }
  };

  useEffect(() => {
    if (userNFTs) {
      const [ids, uris] = userNFTs as [bigint[], string[]];
      setNFTList(ids.map((id, index) => ({
        id: Number(id), 
        uri: uris[index]
      })));
    }
  }, [userNFTs]);

  const handleMintNFT = async () => {
    if (!nftName || !nftImage) {
      message.error("Enter Name & upload Image to continue...");
      return;
    }

    if (!address) {
      message.error("Connect Wallet to Continue...");
      return;
    }

    try {
      setIsMinting(true);
      message.loading({
        content: "Uploading to ipfs...", 
        key: "uploading", 
        duration: 0
      });

      const imageUrl = await uploadToPinata(nftImage);
      if (!imageUrl) throw new Error("IPFS upload failed");

      message.destroy("uploading");
      message.loading({ 
        content: "Minting NFT...", 
        key: "minting", 
        duration: 0
      });

      const tx = await writeContractAsync({
        address: NFT_ADDRESS,
        abi: NFT_ABI,
        functionName: "mintNFT",
        args: [imageUrl]
      });

      console.log("Transaction sent, hash:", tx);
      const tokenId = typeof tx === 'string' ? parseInt(tx, 10) : tx;
      setMintedTokenId(tokenId);

      message.destroy("minting");
      setIsSuccessModalVisible(true);
      setNFTName("");
      setNFTImage(null);
      refetch();
    } catch(error) {
      console.log("Minting Failed", error);
      message.destroy("minting");
      message.error("Tx failed");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <Card title="Mint Land NFT" className="mb-6">
          <div className="max-w-md mx-auto">
            <Form layout="vertical">
              <Form.Item label="Tên Land NFT">
                <Input 
                  value={nftName} 
                  onChange={(e) => setNFTName(e.target.value)}
                  placeholder="Nhập tên cho mảnh đất NFT của bạn"
                  size="large"
                />
              </Form.Item>
              
              <Form.Item label="Hình ảnh Land">
                <Upload 
                  beforeUpload={(file) => { 
                    setNFTImage(file); 
                    return false; 
                  }}
                  showUploadList={false}
                  className="w-full"
                >
                  <Button 
                    icon={<UploadOutlined/>} 
                    size="large" 
                    className="w-full h-12"
                  >
                    {nftImage ? nftImage.name : "Tải lên hình ảnh"}
                  </Button>
                </Upload>
              </Form.Item>
              
              <Button 
                type="primary" 
                onClick={handleMintNFT} 
                loading={isMinting}
                size="large"
                className="w-full h-12 text-lg"
              >
                Mint Land NFT
              </Button>
            </Form>
          </div>

          <Modal
            title="🎉 Mint thành công!"
            open={isSuccessModalVisible}
            onOk={() => setIsSuccessModalVisible(false)}
            onCancel={() => setIsSuccessModalVisible(false)}
            centered
            footer={[
              <Button key="ok" type="primary" onClick={() => setIsSuccessModalVisible(false)}>
                Tuyệt vời!
              </Button>
            ]}
          >
            <div className="text-center py-4">
              <div className="text-6xl mb-4">🏞️</div>
              <p className="text-lg">Bạn đã mint Land NFT thành công!</p>
              <p className="text-gray-600">Giờ bạn có thể bắt đầu khai thác nguyên liệu hiếm.</p>
            </div>
          </Modal>
        </Card>

        <Card title={`🏞️ Bộ sưu tập Land NFT của bạn (${nftList.length})`}>
          {nftList.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🌿</div>
              <p className="text-lg mb-2">Chưa có Land NFT nào.</p>
              <p className="text-sm">Mint Land NFT đầu tiên để bắt đầu hành trình!</p>
            </div>
          ) : (
            <List 
              grid={{ 
                gutter: [16, 16], 
                xs: 1, 
                sm: 2, 
                md: 3, 
                lg: 4, 
                xl: 5 
              }}
              dataSource={nftList}
              renderItem={(item) => (
                <List.Item>
                  <Card 
                    cover={
                      <Image
                        src={item.uri} 
                        alt={`Land NFT ${item.id}`}
                        className="h-48 object-cover"
                        preview={true}
                      />
                    } 
                    className="text-center h-full"
                    hoverable
                  >
                    <Card.Meta 
                      title={`🏞️ Land #${item.id}`}
                      description={
                        <div className="space-y-2">
                          <div className="text-green-600 font-medium">✅ Sẵn sàng khai thác</div>
                          <div className="text-xs text-gray-500">Nhấn để xem chi tiết</div>
                        </div>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
