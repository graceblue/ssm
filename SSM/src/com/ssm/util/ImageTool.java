package com.ssm.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.Random;

/**
 * ��֤������
 * @author gaojianjian
 *
 */
public class ImageTool implements java.io.Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7236586403261687184L;
	private static StringBuffer sRand = new StringBuffer();

	public String getSRand() {
		return sRand.toString();
	}

	public Color getRandColor(int fc, int bc) {
		Random random = new Random();
		if (fc > 255)
			fc = 255;
		if (bc > 255)
			bc = 255;
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}

	public static BufferedImage creatImage() {

		int width = 120, height = 36;
		BufferedImage image = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);

		Graphics g = image.getGraphics();

		Random random = new Random();

		g.setColor(new Color(218, 233, 245));
		g.fillRect(0, 0, width, height);

		g.setFont(new Font("Arial", Font.BOLD, 28));
		for (int i = 0; i < 155; i++) {
			g.setColor(new Color(185, 240, 240));
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			g.drawLine(x, y, x + xl, y + yl);
		}

		sRand.setLength(0);
		for (int i = 0; i < 4; i++) {
			String rand = String.valueOf(random.nextInt(10));
			sRand.append(rand);

			g.setColor(new Color(20 + random.nextInt(110), 20 + random
					.nextInt(110), 20 + random.nextInt(110)));
			g.drawString(rand, 20 * i + 20, 30);
		}

		g.dispose();
		return image;
	}
}