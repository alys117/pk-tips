import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;

public class ImgMark{

    // 透明度
    private static final AlphaComposite COMPOSITE = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.6f);

    // 水印之间的间隔
    private static final int XMOVE = 150;

    // 水印之间的间隔
    private static final int YMOVE = 200;

    /**
     * 打水印(图片)
     *
     * @param srcImgPath  源图片路径
     * @param markImgPath 水印图片路径
     */
    public static void markWithImg(String srcImgPath, String markImgPath) {
        FileOutputStream fos = null;

        try {
            // 读取原始图像
            File srcFile = new File(srcImgPath);
            BufferedImage srcImg = ImageIO.read(srcFile);

            // 原始宽度
            int srcImgWidth = srcImg.getWidth();
            // 原始高度
            int srcImgHeight = srcImg.getHeight();

            // 最终图像
            BufferedImage bufImg = new BufferedImage(srcImgWidth, srcImgHeight, BufferedImage.TYPE_INT_RGB);

            // 创建绘图工具
            Graphics2D g = bufImg.createGraphics();

            bufImg = g.getDeviceConfiguration().createCompatibleImage(srcImgWidth, srcImgHeight, Transparency.TRANSLUCENT);

            g.dispose();

            g = bufImg.createGraphics();

            // 画入原始图像
            g.drawImage(srcImg, 0, 0, srcImgWidth, srcImgHeight, null);

            // 读取水印图片
            BufferedImage markImg = ImageIO.read(new File(markImgPath));

            // 图片宽、高
            int markImgWidth = markImg.getWidth();
            int markImgHeight = markImg.getHeight();

            // 设置水印透明度
            g.setComposite(COMPOSITE);

            // 设置倾斜角度
            g.rotate(Math.toRadians(-35), (double) bufImg.getWidth() / 2, (double) bufImg.getHeight() / 2);

            // 循环添加水印
            int x = -srcImgWidth / 2;
            int y;
            while (x < srcImgWidth * 1.5) {
                y = -srcImgHeight / 2;
                while (y < srcImgHeight * 1.5) {
                    g.drawImage(markImg, x, y, null);
                    y += markImgHeight + YMOVE;
                }
                x += markImgWidth + XMOVE;
            }

            // 释放画图工具
            g.dispose();

            // 输出图片
            fos = new FileOutputStream(new File(srcImgPath.replace(".png", "_mark.png")));
//            fos = new FileOutputStream(srcFile);
            ImageIO.write(bufImg, "png", fos);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (fos != null) {
                try {
                    fos.flush();
                    fos.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }


    public static void main(String[] args) {
      ImgMark.markWithImg("C:\\Users\\drunk\\Desktop\\html_logo.png", "C:\\Users\\drunk\\Desktop\\zender_logo.png");
    }
}