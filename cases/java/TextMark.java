import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;

public class TextMark {

    // 水印字体
    private static final Font FONT = new Font("微软雅黑", Font.PLAIN, 14);

    // 透明度
    private static final AlphaComposite COMPOSITE = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.6f);

    // 水印之间的间隔
    private static final int XMOVE = 150;

    // 水印之间的间隔
    private static final int YMOVE = 200;

    /**
     * 打水印(文字)
     *
     * @param srcImgPath       源文件地址
     * @param font             字体
     * @param markContentColor 水印颜色
     * @param waterMarkContent 水印内容
     */
    public static void markWithContent(String srcImgPath, Font font, Color markContentColor, String waterMarkContent) {
        FileOutputStream fos = null;
        try {
            // 读取原图片信息
            File srcFile = new File(srcImgPath);
            BufferedImage srcImg = ImageIO.read(srcFile);

            // 图片宽、高
            int imgWidth = srcImg.getWidth();
            int imgHeight = srcImg.getHeight();

            // 图片缓存
            BufferedImage bufImg = new BufferedImage(imgWidth, imgHeight, BufferedImage.TYPE_INT_RGB);

            // 创建绘图工具
            Graphics2D g = bufImg.createGraphics();

            bufImg = g.getDeviceConfiguration().createCompatibleImage(imgWidth, imgHeight, Transparency.TRANSLUCENT);
            
            g.dispose();

            g = bufImg.createGraphics();

            // 画入原始图像
            g.drawImage(srcImg, 0, 0, imgWidth, imgHeight, null);

            // 设置水印颜色
            g.setColor(markContentColor);

            // 设置水印透明度
            g.setComposite(COMPOSITE);

            // 设置倾斜角度
            g.rotate(Math.toRadians(-35), (double) bufImg.getWidth() / 2, (double) bufImg.getHeight() / 2);

            // 设置水印字体
            g.setFont(font);

            // 消除java.awt.Font字体的锯齿
            g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

            int x = -imgWidth / 2;
            int y;

            // 字体长度
            int markWidth = FONT.getSize() * getTextLength(waterMarkContent);
            // 字体高度
            int markHeight = FONT.getSize();

            // 循环添加水印
            while (x < imgWidth * 1.5) {
                y = -imgHeight / 2;
                while (y < imgHeight * 1.5) {
                    g.drawString(waterMarkContent, x, y);
                    y += markHeight + YMOVE;
                }
                x += markWidth + XMOVE;
            }

            // 释放画图工具
            g.dispose();

            // 输出图片
            fos = new FileOutputStream(new File(srcImgPath.replace(".png", "_mark.png")));
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


    //计算水印文本长度
    //1、中文长度即文本长度 2、英文长度为文本长度二分之一
    public static int getTextLength(String text) {
        //水印文字长度
        int length = text.length();

        for (int i = 0; i < text.length(); i++) {
            String s = String.valueOf(text.charAt(i));
            if (s.getBytes().length > 1) {
                length++;
            }
        }
        length = length % 2 == 0 ? length / 2 : length / 2 + 1;
        return length;
    }


    public static void main(String[] args) {
        System.out.println("我是一个中国人");
        TextMark.markWithContent("C:\\Users\\drunk\\Desktop\\html_logo.png", FONT, Color.darkGray, "水印文字");
    }
}
