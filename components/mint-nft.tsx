"use client";

import { useState, useEffect } from "react";
import { Button, Input, Card, Form, Upload, message, Modal, List, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { useLanguage } from "@/lib/language-context";

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
  const { t } = useLanguage();
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
        <Card title="HulkLand NFT Collection" className="mb-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* Thông báo về collection */}
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-8 rounded-xl mb-6">
              <h2 className="text-2xl font-bold mb-4">{t('minting.collection.title')}</h2>
              <div className="space-y-4 text-left max-w-lg mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span><strong>{t('minting.collection.totalNFTs')}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span><strong>{t('minting.collection.whitelistOnly')}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span><strong>{t('minting.collection.specialQuests')}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span><strong>{t('minting.collection.mining')}</strong></span>
                </div>
              </div>
            </div>

            {/* Thông báo mint đang khoá */}
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg mb-6">
              <div className="flex items-center mb-3">
                <h3 className="text-lg font-semibold text-orange-800">{t('minting.locked.title')}</h3>
              </div>
              <div className="text-orange-700 space-y-2">
                <p><strong>{t('minting.locked.requirements')}</strong></p>
                <ol className="list-decimal list-inside space-y-1 text-left">
                  <li>{t('minting.locked.step1')}</li>
                  <li>{t('minting.locked.step2')}</li>
                  <li>{t('minting.locked.step3')}</li>
                </ol>
              </div>
            </div>

            {/* Form mint bị disable */}
            <div className="max-w-md mx-auto opacity-50 pointer-events-none">
              <Form layout="vertical">
                <Form.Item label={t('minting.form.nameLabel')}>
                  <Input 
                    value={nftName} 
                    onChange={(e) => setNFTName(e.target.value)}
                    placeholder={t('minting.form.namePlaceholder')}
                    size="large"
                    disabled
                  />
                </Form.Item>
                
                <Form.Item label={t('minting.form.imageLabel')}>
                  <Upload 
                    beforeUpload={(file) => { 
                      setNFTImage(file); 
                      return false; 
                    }}
                    showUploadList={false}
                    className="w-full"
                    disabled
                  >
                    <Button 
                      icon={<UploadOutlined/>} 
                      size="large" 
                      className="w-full h-12"
                      disabled
                    >
                      {nftImage ? nftImage.name : t('minting.form.uploadButton')}
                    </Button>
                  </Upload>
                </Form.Item>
                
                <Button 
                  type="primary" 
                  onClick={handleMintNFT} 
                  loading={isMinting}
                  size="large"
                  className="w-full h-12 text-lg"
                  disabled
                >
                  {t('minting.mintButton')}
                </Button>
              </Form>
            </div>

            {/* Call to action */}
            <div className="mt-8 space-y-4">
              <h4 className="text-lg font-semibold">{t('minting.whitelist.title')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold">{t('minting.whitelist.discord')}</h5>
                  <p className="text-sm text-gray-600">{t('minting.whitelist.discordDesc')}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold">{t('minting.whitelist.social')}</h5>
                  <p className="text-sm text-gray-600">{t('minting.whitelist.socialDesc')}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold">{t('minting.whitelist.quest')}</h5>
                  <p className="text-sm text-gray-600">{t('minting.whitelist.questDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          <Modal
            title={t('minting.success')}
            open={isSuccessModalVisible}
            onOk={() => setIsSuccessModalVisible(false)}
            onCancel={() => setIsSuccessModalVisible(false)}
            centered
            footer={[
              <Button key="ok" type="primary" onClick={() => setIsSuccessModalVisible(false)}>
                {t('minting.successButton')}
              </Button>
            ]}
          >
            <div className="text-center py-4">
              <p className="text-lg">{t('minting.successDesc')}</p>
              <p className="text-gray-600">{t('minting.successMessage')}</p>
              <p className="text-blue-600 font-medium">{t('minting.successAction')}</p>
            </div>
          </Modal>
        </Card>

        <Card title={`${t('minting.collection.title')} (${nftList.length}/10,000)`}>
          <div className="mb-4 text-center">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg inline-block">
              <span className="text-lg font-semibold">
                {t('minting.stats.minted')}: <span className="text-green-600">{nftList.length}</span> / <span className="text-blue-600">10,000</span> NFT
              </span>
            </div>
          </div>
          
          {nftList.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">{t('minting.emptyState.title')}</p>
              <p className="text-sm">{t('minting.emptyState.subtitle')}</p>
              <div className="mt-6">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg inline-block">
                  <p className="text-yellow-800 font-medium">{t('minting.emptyState.remaining')}: <strong>{10000 - nftList.length}</strong> NFT available!</p>
                </div>
              </div>
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
                      title={`HulkLand #${item.id}`}
                      description={
                        <div className="space-y-2">
                          <div className="text-green-600 font-medium">{t('minting.nftCard.whitelistHolder')}</div>
                          <div className="text-blue-600 font-medium">{t('minting.nftCard.readyToMine')}</div>
                          <div className="text-xs text-gray-500">{t('minting.nftCard.clickDetails')}</div>
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
