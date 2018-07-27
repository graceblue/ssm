package com.ssm.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.util.StringUtils;

import com.mysql.jdbc.Connection;

import jxl.Cell;
import jxl.CellFormat;
import jxl.Sheet;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

public class ReadExcel {
	public static String path="d:/err0721.txt";
	
	public static void traverseFolder2(String path) throws Exception {

        File file = new File(path);
        if (file.exists()) {
            File[] files = file.listFiles();
            if (files.length == 0) {
                System.out.println("文件夹是空的!");
                return;
            } else {
                for (File file2 : files) {
                    if (file2.isDirectory()) {
//                        System.out.println("文件夹:" + file2.getAbsolutePath());
                        traverseFolder2(file2.getAbsolutePath());
                    } else {
//                        System.out.println("文件:" + file2.getAbsolutePath());
                        readxls(file2.getAbsolutePath());
//                        mergeExcel("D:/废卡清单/text.xls",file2.getAbsolutePath());
                        
                    }
                }
            }
        } else {
            System.out.println("文件不存在!");
        }
    }
	
	public static void readxls(String filename) throws Exception{
		String  name,num,type,remark,excelname;
	    HSSFRow row;
	    HSSFCell cell,cell2,cell3,cell4;
	    String errinfo="";
        try {
			HSSFWorkbook workbook =new HSSFWorkbook(new FileInputStream(filename));
			 excelname=filename;
			 HSSFSheet sheet =workbook.getSheetAt(0);
			 for (int j = 0; j < sheet.getPhysicalNumberOfRows(); j++) {
				 num="";
				 name="";
				 type="";
				 remark="";
				 row=sheet.getRow(j);
				 if(row!=null){
//					 System.out.println(j);
//					 System.out.println("第"+j+"行共"+row.getPhysicalNumberOfCells()+"列"+isMergedRegion(sheet,j,0));
					 try{
						 cell=row.getCell((short)1);
						 cell.setCellType(HSSFCell.CELL_TYPE_STRING);
						 cell2=row.getCell((short)2);
						 cell2.setCellType(HSSFCell.CELL_TYPE_STRING);
						 cell3=row.getCell((short)3);
						 cell3.setCellType(HSSFCell.CELL_TYPE_STRING);
						 cell4=row.getCell((short)4);
						 cell4.setCellType(HSSFCell.CELL_TYPE_STRING);
						 num=cell2.getStringCellValue().replaceAll("\\s*", "");
						 if(!num.equals("")&&   num.matches("^[0-9]*$") ){
							 try{							 
								 name=cell.getStringCellValue();							 
								 type=cell3.getStringCellValue();							 
								 remark=cell4.getStringCellValue();
								 insert(  name, num, type, remark, excelname);
								 
							 }catch (Exception e) {
//								 e.printStackTrace();
								 StringWriter sw = new StringWriter();
								 e.printStackTrace(new PrintWriter(sw, true));
								 String error = sw.toString();
								 errinfo="第三种："+filename+"第"+j+"行共"+row.getPhysicalNumberOfCells()+"列"+error;
								 writetxt(path,errinfo);
								// TODO: handle exception
							}

						 } 
						 
					 }catch (Exception e) {
//						 System.out.println(filename+"第"+j+"行共"+row.getPhysicalNumberOfCells()+"列");						 
//						 e.printStackTrace();
						 StringWriter sw = new StringWriter();
						 e.printStackTrace(new PrintWriter(sw, true));
						 String error = sw.toString();
						 errinfo="第二种："+filename+"第"+j+"行共"+row.getPhysicalNumberOfCells()+"列"+error;
						 writetxt(path,errinfo);
						// TODO: handle exception
					}
					 
				 }
					 

				 
				 
				 
			 }

		} catch (Exception e) {
			// TODO Auto-generated catch block
//			e.printStackTrace();
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw, true));
			String error = sw.toString();
			errinfo="第一种："+filename+error;
			writetxt(path,errinfo);
		}

	}
	
	
	public static void mergeExcel(String outputFileName, String... inputFileNameArray) {
        if (inputFileNameArray.length == 1) {
        	System.out.println("");
            return;
        }
        try {
            WritableWorkbook outputExcel = Workbook.createWorkbook(new File(outputFileName));
            int index = 0;
            for (String fileName : inputFileNameArray) {
                // 创建excel文件的工作簿对象book
                Workbook inputExcel = Workbook.getWorkbook(new FileInputStream(fileName));
                // 获取excel文件工作簿的工作表数量sheets
                Sheet[] sheets = inputExcel.getSheets();
                for (Sheet sheet : sheets) {
                    WritableSheet writableSheet = outputExcel.createSheet(sheet.getName(), index);
                    copy(sheet, writableSheet);
                    index++;
                }
            }
            /** **********将以上缓存中的内容写到EXCEL文件中******** */
            outputExcel.write();
            /** *********关闭文件************* */
            outputExcel.close();
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            System.out.println(sw.toString());
        }
    }

    private static void copy(Sheet formSheet, WritableSheet toWritableSheet) {
        // 行数
        int rows = formSheet.getRows();
        // 列数
        int columns = formSheet.getColumns();
        for (int rowIndex = 0; rowIndex < rows; rowIndex++) {
            for (int columnIndex = 0; columnIndex < columns; columnIndex++) {
                // 获取当前工作表.row_index,column_index单元格的cell对象
                Cell cell = formSheet.getCell(columnIndex, rowIndex);
                try {
                     CellFormat wcf = (CellFormat) new WritableCellFormat();
                    if (cell.getCellFormat() != null) {
                        wcf = (CellFormat) cell.getCellFormat();
                    }
                    toWritableSheet.addCell(new Label(columnIndex, rowIndex, cell.getContents(), wcf));
                } catch (Exception e) {
                    StringWriter sw = new StringWriter();
                    PrintWriter pw = new PrintWriter(sw);
                    e.printStackTrace(pw);
                    System.out.println(sw.toString());

                }
            }
        }
    }
    public static void main(String[] args) throws Exception {
    	traverseFolder2("D:/废卡清单");
    	conn.close();
    	System.out.println("gg");
	}
    
    
    public static Connection getConn() {
        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost:3307/ssmdb?useUnicode=true&characterEncoding=utf-8";
        String username = "root";
        String password = "123456";
        Connection conn = null;
        try {
            Class.forName(driver); //classLoader,加载对应驱动
            conn = (Connection) DriverManager.getConnection(url, username, password);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }
    
    public static Connection conn = getConn();
    public static  String sql = "insert into card (name,num,type,remark,excelname) values(?,?,?,?,?)";
    
    public static int insert(String  name,String num,String type,String remark,String excelname) {
//        Connection conn = getConn();
        int i = 0;
//        String sql = "insert into card (name,num,type,remark,excelname) values(?,?,?,?,?)";
        PreparedStatement pstmt;
        try {
            pstmt = (PreparedStatement) conn.prepareStatement(sql);
            pstmt.setString(1, name);
            pstmt.setString(2, num);
            pstmt.setString(3, type);
            pstmt.setString(4, remark);
            pstmt.setString(5, excelname);
            i = pstmt.executeUpdate();
            pstmt.close();
//            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return i;
    }
    
    static class Card {
    	String  name,num,type,remark,excelname;

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getNum() {
			return num;
		}

		public void setNum(String num) {
			this.num = num;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public String getRemark() {
			return remark;
		}

		public void setRemark(String remark) {
			this.remark = remark;
		}

		public String getExcelname() {
			return excelname;
		}

		public void setExcelname(String excelname) {
			this.excelname = excelname;
		} 
    	
    }
    
    public static void writetxt(String path,String str) throws Exception {
    	BufferedWriter out;
		try {
			out = new BufferedWriter(
			        new OutputStreamWriter(new FileOutputStream(path,true)));
			try {
		        out.write(str+"\r\n");
		        out.close();  
				
			} catch (Exception e) {
				e.printStackTrace();
				// TODO: handle exception
			}

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 	
    }


    

}
