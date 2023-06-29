import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.SpreadsheetVersion;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.PaneInformation;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.Test;

/**
 *
 * @author huaying1988.com
 */
public class ExcelUtil {

    public static final Logger logger = Logger.getLogger(ExcelUtil.class.getName());

    public static final int ROW_WINDOW_SIZE = 40000;

    public static void resetCellMaxTextLength() {
        SpreadsheetVersion excel2007 = SpreadsheetVersion.EXCEL2007;
        if (Integer.MAX_VALUE != excel2007.getMaxTextLength()) {
            try {
                Field field = excel2007.getClass().getDeclaredField("_maxTextLength");
                field.setAccessible(true);
                field.set(excel2007, Integer.MAX_VALUE);
            } catch (Exception e) {
                System.out.println(e.getLocalizedMessage());
            }
        }
    }

    public static enum ExcelType {
        XLS, XLSX
    }

    public static ExcelType ext2type(String extName) {
        ExcelType excelType = null;
        if (extName == null || "xls".equalsIgnoreCase(extName.toLowerCase())) {
            excelType = ExcelType.XLS;
        } else if ("xlsx".equalsIgnoreCase(extName.toLowerCase())) {
            excelType = ExcelType.XLSX;
        } else {
            logger.log(Level.SEVERE, "不能识别的Excel类型: {0}", extName);
        }
        return excelType;
    }

    public static ExcelType excelTypeFromPath(String filePath) {
        return ext2type(getExtension(filePath));
    }

    public static Workbook newWorkbookByType(ExcelType type) {
        if (type == null) {
            type = ExcelType.XLS;
        }
        switch (type) {
            case XLS:
                return new HSSFWorkbook();
            case XLSX:
                return new SXSSFWorkbook(ROW_WINDOW_SIZE);
            default:
                logger.log(Level.SEVERE, "不能识别的Excel类型: {0}", type.name());
        }
        return null;
    }

    public static Workbook newWorkbookByExt(String extName) {
        return newWorkbookByType(ext2type(extName));
    }

    public static Workbook readWorkbook(String fileName) {
        return readWorkbook(fileName, excelTypeFromPath(fileName));
    }

    public static Workbook readWorkbook(File excelFile) {
        return readWorkbook(excelFile, excelTypeFromPath(excelFile.getAbsolutePath()));
    }

    public static Workbook readWorkbook(InputStream in, ExcelType type) {
        try {
            switch (type) {
                case XLS:
                    return new HSSFWorkbook(in);
                case XLSX:
                    return new XSSFWorkbook(in);
            }
        } catch (IOException ex) {
            logger.log(Level.SEVERE, ex.getLocalizedMessage(), ex);
        }
        return null;
    }

    public static Workbook readWorkbook(File excelFile, ExcelType type) {
        try {
            switch (type) {
                case XLS:
                    return new HSSFWorkbook(new BufferedInputStream(new FileInputStream(excelFile)));
                case XLSX:
                    return new XSSFWorkbook(excelFile);
            }
        } catch (Exception ex) {
            logger.log(Level.SEVERE, ex.getLocalizedMessage(), ex);
        }
        return null;
    }

    public static Workbook readWorkbook(String filePath, ExcelType type) {
        try {
            switch (type) {
                case XLS:
                    return new HSSFWorkbook(new BufferedInputStream(new FileInputStream(filePath)));
                case XLSX:
                    return new XSSFWorkbook(filePath);
            }
        } catch (IOException ex) {
            logger.log(Level.SEVERE, ex.getLocalizedMessage(), ex);
        }
        return null;
    }

    public static int lastFileSeparator(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return -1;
        }
        int lastUnixPos = fileName.lastIndexOf("/");
        int lastWindowsPos = fileName.lastIndexOf("\\");
        return lastUnixPos > lastWindowsPos ? lastUnixPos : lastWindowsPos;
    }

    public static String getExtension(String fileName) throws IllegalArgumentException {
        if (fileName == null) {
            return null;
        }
        int extensionPos = fileName.lastIndexOf(".");
        int lastSeparator = lastFileSeparator(fileName);
        int index = (lastSeparator > extensionPos ? -1 : extensionPos);
        if (index == -1) {
            return "";
        }
        return fileName.substring(index + 1);
    }

    /**
     * 创建空的excel文件,可自定义sheet名称
     *
     * @param filePath 文件路径
     * @param sheetList sheet名称集合(名称不可重复)
     */
    public static void createBlankExcel(String filePath, List<String> sheetList) {
        Workbook workbook = newWorkbookByType(excelTypeFromPath(filePath));
        if (sheetList != null && !sheetList.isEmpty()) {
            for (String sheet : sheetList) {
                workbook.createSheet(sheet);
            }
        } else {
            workbook.createSheet("Sheet1");
        }
        try ( FileOutputStream out = new FileOutputStream(new File(filePath))) {
            workbook.write(out);
        } catch (IOException e) {
            logger.log(Level.SEVERE, e.getLocalizedMessage(), e);
            throw new IllegalArgumentException(e);
        }
    }

    /**
     * 创建空的excel文件,默认只包含一个Sheet1
     *
     * @param filePath 文件路径
     */
    public static void createBlankExcel(String filePath) {
        createBlankExcel(filePath, null);
    }

    public static void disposeWorkBook(Workbook wb) {
        if ((wb != null) && (wb instanceof SXSSFWorkbook)) {
            ((SXSSFWorkbook) wb).dispose();
        }
    }

    /**
     * #合并多个excel文件
     *
     * @param fileLists excel文件路径
     * @param sheetNames sheet页名称列表
     * @param excelFileName 目标文件
     * @return 合并成功的sheet页数
     */
    public static int mergeExcel(List<String> fileLists, List<String[]> sheetNames, String excelFileName) {
        resetCellMaxTextLength();
        int successCnt = 0;
        // 创建新的excel工作簿
        try ( Workbook newExcelWorkBook = newWorkbookByType(excelTypeFromPath(excelFileName))) {
            try {
                // 遍历需要合并的excel文件
                for (int i = 0; i < fileLists.size(); i++) {
                    String excelName = fileLists.get(i);
                    try ( Workbook tmpWorkBook = readWorkbook(excelName)) {  // 创建工作簿
                        if (tmpWorkBook == null) {
                            logger.log(Level.INFO, "创建工作簿失败：{0}", excelName);
                            continue;
                        }
                        try {
                            Map<Short, CellStyle> styleMap = new HashMap();
                            // 获取工作簿中的Sheet个数
                            int len = tmpWorkBook.getNumberOfSheets();
                            if (len <= 1) {
                                Sheet tmpSheet = tmpWorkBook.getSheetAt(0);
                                Sheet newExcelSheet = newExcelWorkBook.createSheet(sheetNames.get(i)[0]);
                                // 复制sheet内容
                                copyExcelSheet(newExcelWorkBook, tmpSheet, newExcelSheet, styleMap);
                                successCnt += 1;
                            } else {
                                for (int j = 0; j < len; j++) {
                                    Sheet tmpSheet = tmpWorkBook.getSheetAt(j);
                                    Sheet newExcelSheet = newExcelWorkBook.createSheet(sheetNames.get(i)[j]);
                                    // 复制sheet内容
                                    copyExcelSheet(newExcelWorkBook, tmpSheet, newExcelSheet, styleMap);
                                    successCnt += 1;
                                }
                            }
                        } finally {
                            disposeWorkBook(tmpWorkBook);
                        }
                    } catch (IOException e) {
                        logger.log(Level.SEVERE, e.getLocalizedMessage(), e);
                        throw new IllegalArgumentException(e);
                    }
                }
                // 新生成的excel文件
                // 判断文件是否存在
                File excelFile = new File(excelFileName);
                if (excelFile.exists()) {
                    // 存在则删除
                    excelFile.delete();
                }
                // 使用输出流写出
                try ( FileOutputStream fos = new FileOutputStream(excelFileName)) {
                    newExcelWorkBook.write(fos);
                    fos.flush();
                } catch (IOException e) {
                    logger.log(Level.SEVERE, e.getLocalizedMessage(), e);
                    throw new IllegalArgumentException(e);
                }
            } finally {
                disposeWorkBook(newExcelWorkBook);
            }
        } catch (IOException e) {
            logger.log(Level.SEVERE, e.getLocalizedMessage(), e);
            throw new IllegalArgumentException(e);
        }
        logger.log(Level.FINE, "excel文件合并成功，合并后文件路径：{0}", excelFileName);
        return successCnt;
    }

    /**
     * #复制sheet到新的excel文件中
     *
     * @param workbook excel工作簿
     * @param tmpSheet 来源sheet
     * @param newExcelSheet 新生成的sheet
     * @param styleMap 防止style重复创建
     */
    public static void copyExcelSheet(Workbook workbook, Sheet tmpSheet, Sheet newExcelSheet, Map<Short, CellStyle> styleMap) {
        // 合并单元格
        mergeSheetAllRegion(tmpSheet, newExcelSheet);
        // 冻结窗格
        freezePane(tmpSheet, newExcelSheet);
        // 设置单元格列宽度
        // 获取最后一个单元格位置
        int len = tmpSheet.getRow(tmpSheet.getFirstRowNum()).getLastCellNum();
        for (int i = 0; i < len; i++) {
            newExcelSheet.setColumnWidth(i, tmpSheet.getColumnWidth(i));
        }
        // 复制每行内容
        Iterator<Row> it = tmpSheet.iterator();
        while (it.hasNext()) {
            Row tmpRow = (Row) it.next();
            // 创建新行
            Row newExcelRow = newExcelSheet.createRow(tmpRow.getRowNum());
            // 复制行
            copyExcelRow(workbook, tmpRow, newExcelRow, styleMap);
        }
    }

    /**
     * #合并单元格
     *
     * @param tmpSheet 来源sheet
     * @param newExcelSheet 目标sheet
     */
    private static void mergeSheetAllRegion(Sheet tmpSheet, Sheet newExcelSheet) {
        int num = tmpSheet.getNumMergedRegions();
        CellRangeAddress cellRange;
        for (int i = 0; i < num; i++) {
            cellRange = tmpSheet.getMergedRegion(i);
            newExcelSheet.addMergedRegion(cellRange);
        }
    }

    /**
     * #冻结窗格
     *
     * @param tmpSheet 来源sheet
     * @param newExcelSheet 目标sheet
     */
    private static void freezePane(Sheet tmpSheet, Sheet newExcelSheet) {
        PaneInformation info = tmpSheet.getPaneInformation();
        if (info != null) {
            if (info.isFreezePane()) {
                newExcelSheet.createFreezePane(info.getVerticalSplitPosition(), info.getHorizontalSplitPosition(), info.getVerticalSplitLeftColumn(), info.getHorizontalSplitTopRow());
            } else {
                newExcelSheet.createSplitPane(info.getVerticalSplitPosition(), info.getHorizontalSplitPosition(), info.getVerticalSplitLeftColumn(), info.getHorizontalSplitTopRow(), info.getActivePane());
            }
        }
    }

    /**
     * #复制excel中的行到新的sheet中
     *
     * @param workbook 目标工作簿
     * @param tmpRow 来源excel行
     * @param newExcelRow 目标excel行
     * @param styleMap 防止style重复创建
     */
    public static void copyExcelRow(Workbook workbook, Row tmpRow, Row newExcelRow, Map<Short, CellStyle> styleMap) {
        // 设置行高
        if (tmpRow.getHeight() == 0 && !tmpRow.getZeroHeight()) {
            //未设置隐藏行，行高却未0为异常情况，特殊处理
            newExcelRow.setHeightInPoints(14f);
        } else {
            newExcelRow.setHeight(tmpRow.getHeight());
        }
        newExcelRow.setZeroHeight(tmpRow.getZeroHeight());
        //newExcelRow.setHeightInPoints(tmpRow.getHeightInPoints());
        // 获取所有列
        Iterator<Cell> it = tmpRow.cellIterator();
        while (it.hasNext()) {
            Cell tmpCell = (Cell) it.next();
            // 创建单元格
            Cell newExcelCell = newExcelRow.createCell(tmpCell.getColumnIndex());
            // 复制单元格
            copyExcelCell(workbook, tmpCell, newExcelCell, styleMap);
        }
    }

    /**
     * #复制单元格
     *
     * @param workbook 目标工作簿
     * @param tmpCell 来源excel单元格
     * @param newExcelCell 目标excel单元格
     * @param styleMap 防止style重复创建
     */
    public static void copyExcelCell(Workbook workbook, Cell tmpCell, Cell newExcelCell, Map<Short, CellStyle> styleMap) {
        CellStyle tmpStyle = tmpCell.getCellStyle();
        CellStyle newExcelStyle = styleMap.get(tmpStyle.getIndex());
        if (newExcelStyle == null) {
            newExcelStyle = workbook.createCellStyle();
            // 复制单元格样式
            newExcelStyle.cloneStyleFrom(tmpStyle);
            styleMap.put(tmpStyle.getIndex(), newExcelStyle);
        }
        // 单元格样式
        newExcelCell.setCellStyle(newExcelStyle);
        if (tmpCell.getCellComment() != null) {
            newExcelCell.setCellComment(tmpCell.getCellComment());
        }
        // 不同数据类型处理
        CellType tmpCellType = tmpCell.getCellType();
        newExcelCell.setCellType(tmpCellType);
        if (null == tmpCellType) {
        } else {
            switch (tmpCellType) {
                case NUMERIC:
                    if (DateUtil.isCellDateFormatted(tmpCell)) {
                        newExcelCell.setCellValue(tmpCell.getDateCellValue());
                    } else {
                        newExcelCell.setCellValue(tmpCell.getNumericCellValue());
                    }
                    break;
                case STRING:
                    newExcelCell.setCellValue(tmpCell.getRichStringCellValue());
                    break;
                case BLANK:
                    break;
                case BOOLEAN:
                    newExcelCell.setCellValue(tmpCell.getBooleanCellValue());
                    break;
                case ERROR:
                    newExcelCell.setCellErrorValue(tmpCell.getErrorCellValue());
                    break;
                case FORMULA:
                    newExcelCell.setCellFormula(tmpCell.getCellFormula());
                    break;
                default:
                    break;
            }
        }
    }

    public static String joinStrArray(String[] strs, String spliter) {
        if (strs == null) {
            return null;
        }
        if (strs.length == 0) {
            return "";
        }
        StringBuilder sb = new StringBuilder();
        for (String str : strs) {
            sb.append(spliter).append(str);
        }
        sb.delete(0, spliter.length());
        return sb.toString();
    }

    public static void main(String[] args) {
        // IOUtils.setByteArrayMaxOverride(1000000000);
        logger.setLevel(Level.INFO);
        if (args.length < 3 || (args.length & 1) != 1) {
            System.out.println("参数数目错误！");
            System.out.println("参数样式: 待合并excel文件路径1 合并后sheet页名称1 待合并excel文件路径2 合并后sheet页名称1:名称2  ... 目标文件路径");
            throw new IllegalArgumentException("参数错误!");
        }
        String targetPath = args[args.length - 1];
        List<String> filePaths = new ArrayList();
        List<String[]> sheetNames = new ArrayList();
        int i = 0;
        while (i < args.length - 1) {
            String filePath = args[i++];
            String[] sheetName = args[i++].split(":", -1);
            filePaths.add(filePath);
            sheetNames.add(sheetName);
            System.out.println(filePath + " => [sheet] " + joinStrArray(sheetName, " , "));
        }
        int successCnt = mergeExcel(filePaths, sheetNames, targetPath);
        if (successCnt == 0) {
            throw new RuntimeException("合并失败！没有sheet被合并入目标文件！");
        }
        System.out.println("\nOK excel文件合并成功，共合并sheet页" + successCnt + "个，合并后文件路径：" + targetPath + "\n");
    }

    @Test
    public void do1(){
        String[] args = new String[5];
        args[0] = "C:\\Users\\drunk\\Desktop\\1.xlsx";
        args[1] = "sheet1";
        args[2] = "C:\\Users\\drunk\\Desktop\\2.xlsx";
        args[3] = "sheet2";
        args[4] = "C:\\Users\\drunk\\Desktop\\3.xlsx";
        logger.setLevel(Level.INFO);
        if (args.length < 3 || (args.length & 1) != 1) {
            System.out.println("参数数目错误！");
            System.out.println("参数样式: 待合并excel文件路径1 合并后sheet页名称1 待合并excel文件路径2 合并后sheet页名称1:名称2  ... 目标文件路径");
            throw new IllegalArgumentException("参数错误!");
        }
        String targetPath = args[args.length - 1];
        List<String> filePaths = new ArrayList();
        List<String[]> sheetNames = new ArrayList();
        int i = 0;
        while (i < args.length - 1) {
            String filePath = args[i++];
            String[] sheetName = args[i++].split(":", -1);
            filePaths.add(filePath);
            sheetNames.add(sheetName);
            System.out.println(filePath + " => [sheet] " + joinStrArray(sheetName, " , "));
        }
        int successCnt = mergeExcel(filePaths, sheetNames, targetPath);
        if (successCnt == 0) {
            throw new RuntimeException("合并失败！没有sheet被合并入目标文件！");
        }
        System.out.println("\nOK excel文件合并成功，共合并sheet页" + successCnt + "个，合并后文件路径：" + targetPath + "\n");
    }
}