import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <section className="hero-section py-8 md:py-16 lg:py-24 w-full">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  HulkLand: Khám phá và Xây dựng Thế giới NFT của Bạn
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  Bước vào HulkLand, một thế giới game NFT độc đáo trên Saga Blockchain. Sở hữu những mảnh đất NFT quý
                  hiếm, khai thác nguyên liệu hiếm và nâng cấp chúng để tạo nên đế chế của riêng bạn.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/mint" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">Mint Land Ngay</Button>
                </Link>
                <Link href="/stake" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Bắt đầu Khai thác
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/placeholder.svg?height=400&width=550"
                width="550"
                height="400"
                alt="Sagaverse Hero"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="features-section py-8 md:py-16 lg:py-24 bg-muted w-full">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">Tính năng nổi bật</h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl">
                Sagaverse mang đến trải nghiệm chơi game NFT độc đáo với các cơ chế hấp dẫn.
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
            <div className="bg-card rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-bold">Land NFT</h3>
              <p className="text-sm text-muted-foreground">
                Sở hữu những mảnh đất NFT độc nhất với các thuộc tính như độ hiếm, quần xã sinh vật và tỷ lệ nguyên liệu.
                Chỉ có 15.000 mảnh đất cố định.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-bold">Khai thác Nguyên liệu Hiếm</h3>
              <p className="text-sm text-muted-foreground">
                Stake Land NFT để khai thác các nguyên liệu hiếm như Mystic Crystal, Dragon Scale, Ancient Ore theo thời gian.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 space-y-3 sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-bold">Hệ thống Crafting</h3>
              <p className="text-sm text-muted-foreground">
                Sử dụng nguyên liệu hiếm để nâng cấp Land NFT, tăng cấp độ và thay đổi diện mạo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section py-8 md:py-16 lg:py-24 w-full">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">Sẵn sàng tham gia Sagaverse?</h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl">
                Bắt đầu hành trình của bạn ngay hôm nay bằng cách mint Land NFT đầu tiên.
              </p>
            </div>
            <Link href="/mint">
              <Button size="lg" className="text-lg px-8 py-3">Bắt đầu</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
