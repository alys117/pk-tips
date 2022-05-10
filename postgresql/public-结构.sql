/*
 Navicat Premium Data Transfer

 Source Server         : pqitech
 Source Server Type    : PostgreSQL
 Source Server Version : 140001
 Source Host           : 61.129.70.129:22150
 Source Catalog        : foreign_teacher
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140001
 File Encoding         : 65001

 Date: 09/05/2022 00:30:46
*/


-- ----------------------------
-- Sequence structure for comment_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."comment_id_seq";
CREATE SEQUENCE "public"."comment_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for company_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."company_id_seq";
CREATE SEQUENCE "public"."company_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for favorite_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."favorite_id_seq";
CREATE SEQUENCE "public"."favorite_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for match_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."match_id_seq";
CREATE SEQUENCE "public"."match_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for offer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."offer_id_seq";
CREATE SEQUENCE "public"."offer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for order_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."order_id_seq";
CREATE SEQUENCE "public"."order_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for permission_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."permission_id_seq";
CREATE SEQUENCE "public"."permission_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for role_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."role_id_seq";
CREATE SEQUENCE "public"."role_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sale_order_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sale_order_id_seq";
CREATE SEQUENCE "public"."sale_order_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for teacher_comment_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."teacher_comment_id_seq";
CREATE SEQUENCE "public"."teacher_comment_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for teacher_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."teacher_id_seq";
CREATE SEQUENCE "public"."teacher_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for teacher_id_seq11
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."teacher_id_seq11";
CREATE SEQUENCE "public"."teacher_id_seq11" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for upload_info_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."upload_info_id_seq";
CREATE SEQUENCE "public"."upload_info_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for user_info_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_info_id_seq";
CREATE SEQUENCE "public"."user_info_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for user_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_log_id_seq";
CREATE SEQUENCE "public"."user_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for visitor_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."visitor_id_seq";
CREATE SEQUENCE "public"."visitor_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for website_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."website_id_seq";
CREATE SEQUENCE "public"."website_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for cache
-- ----------------------------
DROP TABLE IF EXISTS "public"."cache";
CREATE TABLE "public"."cache" (
  "key" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "value" jsonb NOT NULL DEFAULT '{}'::jsonb
)
;

-- ----------------------------
-- Records of cache
-- ----------------------------

-- ----------------------------
-- Table structure for cmda_exec
-- ----------------------------
DROP TABLE IF EXISTS "public"."cmda_exec";
CREATE TABLE "public"."cmda_exec" (
  "cmda_output" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of cmda_exec
-- ----------------------------

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS "public"."comment";
CREATE TABLE "public"."comment" (
  "id" int4 NOT NULL DEFAULT nextval('comment_id_seq'::regclass),
  "teacher_id" int4,
  "user_id" int4,
  "comment" jsonb DEFAULT '[]'::jsonb,
  "time_created" timestamp(6) NOT NULL DEFAULT now(),
  "time_updated" timestamp(6) NOT NULL DEFAULT now(),
  "show" bool DEFAULT true,
  "top" bool DEFAULT false
)
;
COMMENT ON COLUMN "public"."comment"."id" IS 'id';
COMMENT ON COLUMN "public"."comment"."teacher_id" IS '外教ID';
COMMENT ON COLUMN "public"."comment"."user_id" IS '用户ID';
COMMENT ON COLUMN "public"."comment"."comment" IS '评论';
COMMENT ON COLUMN "public"."comment"."time_created" IS '评论创建时间';
COMMENT ON COLUMN "public"."comment"."time_updated" IS '评论修改时间';
COMMENT ON COLUMN "public"."comment"."show" IS '是否显示';
COMMENT ON COLUMN "public"."comment"."top" IS '是否置顶';

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS "public"."company";
CREATE TABLE "public"."company" (
  "id" int4 NOT NULL DEFAULT nextval('company_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "location" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "level" int4 NOT NULL DEFAULT 0,
  "principal" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "principal_post" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "principal_phone" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT ''::character varying,
  "principal_email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT ''::character varying,
  "principal_wechat" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT ''::character varying,
  "contract" varchar(255) COLLATE "pg_catalog"."default",
  "contract_other" varchar(255) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "other" jsonb DEFAULT '{}'::jsonb,
  "time_created" timestamp(6) NOT NULL DEFAULT now(),
  "time_updated" timestamp(6) NOT NULL DEFAULT now(),
  "contract_status" int4,
  "contract_expect" varchar(255) COLLATE "pg_catalog"."default",
  "contract_note" varchar(255) COLLATE "pg_catalog"."default",
  "payment" varchar(255) COLLATE "pg_catalog"."default",
  "pay_expiry" varchar(255) COLLATE "pg_catalog"."default",
  "pay_agreement" varchar(255) COLLATE "pg_catalog"."default",
  "contract_post" varchar(255) COLLATE "pg_catalog"."default",
  "bill" varchar(255) COLLATE "pg_catalog"."default",
  "bill_note" varchar(255) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."company"."name" IS '公司名称';
COMMENT ON COLUMN "public"."company"."location" IS '公司位置';
COMMENT ON COLUMN "public"."company"."level" IS '等级星';
COMMENT ON COLUMN "public"."company"."principal" IS '负责人';
COMMENT ON COLUMN "public"."company"."principal_post" IS '负责人职位';
COMMENT ON COLUMN "public"."company"."principal_phone" IS '负责人手机号';
COMMENT ON COLUMN "public"."company"."principal_email" IS '负责人邮箱';
COMMENT ON COLUMN "public"."company"."principal_wechat" IS '负责人微信';
COMMENT ON COLUMN "public"."company"."contract" IS '合同';
COMMENT ON COLUMN "public"."company"."contract_other" IS '非标合同标注';
COMMENT ON COLUMN "public"."company"."contract_status" IS '合同状态';
COMMENT ON COLUMN "public"."company"."contract_expect" IS '合同期限';
COMMENT ON COLUMN "public"."company"."contract_note" IS '备注';
COMMENT ON COLUMN "public"."company"."payment" IS '付款方式';
COMMENT ON COLUMN "public"."company"."pay_expiry" IS '付款保证期';
COMMENT ON COLUMN "public"."company"."pay_agreement" IS '付款协议费用';
COMMENT ON COLUMN "public"."company"."contract_post" IS '合同邮寄信息';
COMMENT ON COLUMN "public"."company"."bill" IS '发票信息';
COMMENT ON COLUMN "public"."company"."bill_note" IS '备注：如注意催款';

-- ----------------------------
-- Records of company
-- ----------------------------

-- ----------------------------
-- Table structure for dictionary
-- ----------------------------
DROP TABLE IF EXISTS "public"."dictionary";
CREATE TABLE "public"."dictionary" (
  "select_type" int4 NOT NULL,
  "select_value" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "select_name" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of dictionary
-- ----------------------------

-- ----------------------------
-- Table structure for favorite
-- ----------------------------
DROP TABLE IF EXISTS "public"."favorite";
CREATE TABLE "public"."favorite" (
  "id" int4 NOT NULL DEFAULT nextval('favorite_id_seq'::regclass),
  "openid" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "favorite" _int4 DEFAULT '{}'::integer[],
  "phone" varchar(255) COLLATE "pg_catalog"."default",
  "other" jsonb DEFAULT '{}'::jsonb,
  "time_created" timestamp(6) DEFAULT now(),
  "time_updated" timestamp(6) DEFAULT now()
)
;
COMMENT ON COLUMN "public"."favorite"."openid" IS '小程序openid';
COMMENT ON COLUMN "public"."favorite"."favorite" IS '收藏';

-- ----------------------------
-- Records of favorite
-- ----------------------------

-- ----------------------------
-- Table structure for match
-- ----------------------------
DROP TABLE IF EXISTS "public"."match";
CREATE TABLE "public"."match" (
  "id" int4 NOT NULL DEFAULT nextval('match_id_seq'::regclass),
  "teacher_id" int4 NOT NULL,
  "salary" float8 NOT NULL,
  "com_people_id" int4 NOT NULL,
  "contract_start" timestamp(6),
  "contract_end" timestamp(6),
  "history" _int4 NOT NULL,
  "status" int4 NOT NULL,
  "failed_reason" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "other" jsonb NOT NULL,
  "time_created" timestamp(6) NOT NULL DEFAULT now(),
  "time_updated" timestamp(6) NOT NULL DEFAULT now(),
  "offer_id" int4 NOT NULL
)
;

-- ----------------------------
-- Records of match
-- ----------------------------

-- ----------------------------
-- Table structure for offer
-- ----------------------------
DROP TABLE IF EXISTS "public"."offer";
CREATE TABLE "public"."offer" (
  "id" int4 NOT NULL DEFAULT nextval('offer_id_seq'::regclass),
  "label" int4 NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(4000) COLLATE "pg_catalog"."default",
  "description_file" varchar(255) COLLATE "pg_catalog"."default",
  "company_id" int4 NOT NULL,
  "location" varchar(255) COLLATE "pg_catalog"."default" DEFAULT '[]'::jsonb,
  "near_subway" varchar(255) COLLATE "pg_catalog"."default" DEFAULT '[]'::jsonb,
  "voice" _int4 NOT NULL,
  "org_type" _int4 NOT NULL,
  "provide_visa" _int4 NOT NULL,
  "salary_scope" _int4,
  "housing_allowance" varchar(255) COLLATE "pg_catalog"."default",
  "hiring_time" int4 NOT NULL,
  "other_require" varchar(255) COLLATE "pg_catalog"."default",
  "other" jsonb DEFAULT '{}'::jsonb,
  "time_created" timestamp(6) NOT NULL DEFAULT now(),
  "time_updated" timestamp(6) NOT NULL DEFAULT now(),
  "org_name" varchar(255) COLLATE "pg_catalog"."default",
  "other_welfare_treatment" varchar(255) COLLATE "pg_catalog"."default",
  "on_board_time" timestamp(6),
  "org_location" varchar(255) COLLATE "pg_catalog"."default",
  "skin_color" _int4,
  "offer_num" varchar COLLATE "pg_catalog"."default",
  "top" bool DEFAULT false,
  "background" varchar(64) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."offer"."label" IS '标签（招聘状态）';
COMMENT ON COLUMN "public"."offer"."title" IS '标题';
COMMENT ON COLUMN "public"."offer"."description" IS '职位描述';
COMMENT ON COLUMN "public"."offer"."description_file" IS '职位描述附件';
COMMENT ON COLUMN "public"."offer"."company_id" IS '公司id';
COMMENT ON COLUMN "public"."offer"."location" IS '公司所在地';
COMMENT ON COLUMN "public"."offer"."near_subway" IS '最近的地铁站';
COMMENT ON COLUMN "public"."offer"."voice" IS '口语要求';
COMMENT ON COLUMN "public"."offer"."org_type" IS '机构类型';
COMMENT ON COLUMN "public"."offer"."provide_visa" IS '是否提供签证';
COMMENT ON COLUMN "public"."offer"."salary_scope" IS '薪酬范围';
COMMENT ON COLUMN "public"."offer"."housing_allowance" IS '住房补贴';
COMMENT ON COLUMN "public"."offer"."hiring_time" IS '招聘时间';
COMMENT ON COLUMN "public"."offer"."other_require" IS '其他要求';
COMMENT ON COLUMN "public"."offer"."org_name" IS '机构名称';
COMMENT ON COLUMN "public"."offer"."other_welfare_treatment" IS '其他福利待遇';
COMMENT ON COLUMN "public"."offer"."on_board_time" IS '到岗时间';
COMMENT ON COLUMN "public"."offer"."org_location" IS '机构位置';
COMMENT ON COLUMN "public"."offer"."skin_color" IS '肤色要求';
COMMENT ON COLUMN "public"."offer"."offer_num" IS '职位编号';
COMMENT ON COLUMN "public"."offer"."top" IS '是否置顶';
COMMENT ON COLUMN "public"."offer"."background" IS '背景色';

-- ----------------------------
-- Records of offer
-- ----------------------------

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS "public"."order";
CREATE TABLE "public"."order" (
  "id" int4 NOT NULL DEFAULT nextval('order_id_seq'::regclass),
  "order_no" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "teacher_id" int4 NOT NULL DEFAULT 0,
  "teacher_name" varchar(255) COLLATE "pg_catalog"."default",
  "company_id" int4 DEFAULT 0,
  "company_name" varchar(255) COLLATE "pg_catalog"."default",
  "user_id" int4 NOT NULL DEFAULT 0,
  "principal_post" varchar(255) COLLATE "pg_catalog"."default",
  "interview_status" varchar(255) COLLATE "pg_catalog"."default",
  "financial_status" varchar(255) COLLATE "pg_catalog"."default",
  "time_created" timestamp(6) DEFAULT now(),
  "time_updated" timestamp(6),
  "recommend_id" int4,
  "is_channel" bool,
  "channel_fee" int4,
  "payment" varchar(255) COLLATE "pg_catalog"."default",
  "pay_time" timestamp(6),
  "is_bill" bool,
  "real_fee" int4,
  "collected_time" timestamp(6),
  "balance" int4,
  "bill_time" timestamp(6),
  "bill_note" varchar(255) COLLATE "pg_catalog"."default",
  "offer_id" int4,
  "order_time" timestamp(6),
  "channel_name" varchar(255) COLLATE "pg_catalog"."default",
  "remark" varchar(255) COLLATE "pg_catalog"."default",
  "real_contract_time" timestamp(6),
  "real_on_board_time" timestamp(6),
  "pay_final_time" timestamp(6),
  "collected_final_time" timestamp(6)
)
;
COMMENT ON COLUMN "public"."order"."id" IS 'id';
COMMENT ON COLUMN "public"."order"."order_no" IS '订单编号';
COMMENT ON COLUMN "public"."order"."teacher_id" IS '外教id';
COMMENT ON COLUMN "public"."order"."teacher_name" IS '外教名称';
COMMENT ON COLUMN "public"."order"."company_id" IS '院校id';
COMMENT ON COLUMN "public"."order"."company_name" IS '院校名称';
COMMENT ON COLUMN "public"."order"."user_id" IS '用户id';
COMMENT ON COLUMN "public"."order"."principal_post" IS '职位';
COMMENT ON COLUMN "public"."order"."interview_status" IS '面试订单状态';
COMMENT ON COLUMN "public"."order"."financial_status" IS '财务订单状态';
COMMENT ON COLUMN "public"."order"."time_created" IS '订单时间';
COMMENT ON COLUMN "public"."order"."time_updated" IS '修改时间';
COMMENT ON COLUMN "public"."order"."recommend_id" IS '推荐官ID';
COMMENT ON COLUMN "public"."order"."is_channel" IS '是否为渠道';
COMMENT ON COLUMN "public"."order"."channel_fee" IS '渠道费用';
COMMENT ON COLUMN "public"."order"."payment" IS '付款方式';
COMMENT ON COLUMN "public"."order"."pay_time" IS '协定前款时间';
COMMENT ON COLUMN "public"."order"."is_bill" IS '是否开票';
COMMENT ON COLUMN "public"."order"."real_fee" IS '实收金额';
COMMENT ON COLUMN "public"."order"."collected_time" IS '实收前款时间';
COMMENT ON COLUMN "public"."order"."balance" IS '剩余款额';
COMMENT ON COLUMN "public"."order"."bill_time" IS '开票时间';
COMMENT ON COLUMN "public"."order"."bill_note" IS '开票情况';
COMMENT ON COLUMN "public"."order"."offer_id" IS '职位ID';
COMMENT ON COLUMN "public"."order"."order_time" IS '订单时间';
COMMENT ON COLUMN "public"."order"."channel_name" IS '渠道名称';
COMMENT ON COLUMN "public"."order"."remark" IS '备注';
COMMENT ON COLUMN "public"."order"."real_contract_time" IS '实际签约时间';
COMMENT ON COLUMN "public"."order"."real_on_board_time" IS '实际到岗时间';
COMMENT ON COLUMN "public"."order"."pay_final_time" IS '协定尾款时间';
COMMENT ON COLUMN "public"."order"."collected_final_time" IS '实收尾款时间';

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS "public"."permission";
CREATE TABLE "public"."permission" (
  "id" int4 NOT NULL DEFAULT nextval('permission_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of permission
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS "public"."role";
CREATE TABLE "public"."role" (
  "id" int4 NOT NULL DEFAULT nextval('role_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of role
-- ----------------------------

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS "public"."role_permission";
CREATE TABLE "public"."role_permission" (
  "role_id" int4 NOT NULL,
  "permission_id" int4 NOT NULL
)
;

-- ----------------------------
-- Records of role_permission
-- ----------------------------

-- ----------------------------
-- Table structure for sale_order
-- ----------------------------
DROP TABLE IF EXISTS "public"."sale_order";
CREATE TABLE "public"."sale_order" (
  "id" int8 NOT NULL DEFAULT nextval('sale_order_id_seq'::regclass),
  "order_no" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "project_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "develop_cycle" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "project_date" date NOT NULL,
  "project_progress" numeric(16,2) NOT NULL DEFAULT 0,
  "return_cycle" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "time_created" timestamp(6) NOT NULL DEFAULT now(),
  "time_updated" timestamp(6) NOT NULL DEFAULT now()
)
;
COMMENT ON COLUMN "public"."sale_order"."order_no" IS '订单编号';
COMMENT ON COLUMN "public"."sale_order"."project_name" IS '项目名称';
COMMENT ON COLUMN "public"."sale_order"."develop_cycle" IS '研发周期';
COMMENT ON COLUMN "public"."sale_order"."project_date" IS '项目时间';
COMMENT ON COLUMN "public"."sale_order"."project_progress" IS '项目进度';
COMMENT ON COLUMN "public"."sale_order"."return_cycle" IS '收款周期';

-- ----------------------------
-- Records of sale_order
-- ----------------------------

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS "public"."teacher";
CREATE TABLE "public"."teacher" (
  "id" int4 NOT NULL DEFAULT nextval('teacher_id_seq'::regclass),
  "number" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "first_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "second_name" varchar(255) COLLATE "pg_catalog"."default",
  "birthday" timestamp(6) DEFAULT NULL::timestamp without time zone,
  "gender" bool NOT NULL,
  "passport" varchar(255) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "passport_pic" varchar(255) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "national" varchar(255) COLLATE "pg_catalog"."default",
  "phone" varchar(255) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "wechat" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "education" int4 NOT NULL,
  "education_pic" varchar(255) COLLATE "pg_catalog"."default",
  "certificate" _int4 NOT NULL DEFAULT '{}'::integer[],
  "certificate_other" varchar COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "certificate_pic" jsonb DEFAULT '[]'::jsonb,
  "subject" _int4 NOT NULL DEFAULT '{}'::integer[],
  "subject_other" varchar COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "age_group" _int4 NOT NULL DEFAULT '{}'::integer[],
  "special_exp_other" varchar(255) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "company_require" _int4 NOT NULL DEFAULT '{}'::integer[],
  "company_require_other" varchar(255) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "picture" varchar(255) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "video" varchar(255) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "current_location" _varchar COLLATE "pg_catalog"."default",
  "working_condition" int4 NOT NULL,
  "first_apply_visa" bool DEFAULT false,
  "no_crime" bool DEFAULT true,
  "edu_cert" bool DEFAULT false,
  "recommand" bool DEFAULT false,
  "visa_type" int4 DEFAULT 0,
  "visa_expire" timestamp(6) DEFAULT now(),
  "expect_entry_time" timestamp(6) DEFAULT now(),
  "expect_job_city" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "expect_job_city_code" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "expect_job_prov_code" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "expect_city_only" bool DEFAULT false,
  "expect_salary_start" float8 DEFAULT 0.0,
  "expect_salary_end" float8 DEFAULT 0.0,
  "need_shelter" bool DEFAULT false,
  "com_people" int4 DEFAULT 0,
  "com_people_id" int4 DEFAULT 0,
  "level" int4 DEFAULT 0,
  "bad_record" _int4 NOT NULL DEFAULT '{}'::integer[],
  "bad_record_other" varchar(255) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "label" jsonb DEFAULT '[]'::jsonb,
  "commit" jsonb DEFAULT '[]'::jsonb,
  "other" jsonb DEFAULT '{}'::jsonb,
  "time_created" timestamp(6) DEFAULT now(),
  "time_updated" timestamp(6) DEFAULT now(),
  "is_part_time" bool,
  "part_time" date,
  "subject_other_language" varchar(255) COLLATE "pg_catalog"."default",
  "working_seniority_start" timestamp(6),
  "working_seniority_end" timestamp(6),
  "outbound" varchar(1) COLLATE "pg_catalog"."default",
  "user_id" int4,
  "job_status" int4,
  "open_date" timestamp(6),
  "native_flag" bool,
  "part_time_desc" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "area_will" int4,
  "surname" varchar(255) COLLATE "pg_catalog"."default",
  "recruit_id" int4,
  "recommend_id" int4,
  "first_visa_options" _varchar COLLATE "pg_catalog"."default",
  "other_people" varchar(255) COLLATE "pg_catalog"."default",
  "special_exp" _int4 NOT NULL DEFAULT '{}'::integer[],
  "virtual" bool,
  "wx_nickname" varchar(255) COLLATE "pg_catalog"."default",
  "expect_job_province_code" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "first_name_latin" varchar(255) COLLATE "pg_catalog"."default",
  "surname_latin" varchar(255) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."teacher"."number" IS '编号';
COMMENT ON COLUMN "public"."teacher"."first_name" IS '姓';
COMMENT ON COLUMN "public"."teacher"."second_name" IS '名';
COMMENT ON COLUMN "public"."teacher"."birthday" IS '出生年月';
COMMENT ON COLUMN "public"."teacher"."gender" IS '性别';
COMMENT ON COLUMN "public"."teacher"."passport" IS '护照';
COMMENT ON COLUMN "public"."teacher"."passport_pic" IS '护照图片';
COMMENT ON COLUMN "public"."teacher"."national" IS '国际';
COMMENT ON COLUMN "public"."teacher"."phone" IS '手机号';
COMMENT ON COLUMN "public"."teacher"."wechat" IS '微信';
COMMENT ON COLUMN "public"."teacher"."email" IS '邮箱';
COMMENT ON COLUMN "public"."teacher"."education" IS '学历';
COMMENT ON COLUMN "public"."teacher"."education_pic" IS '学历照片';
COMMENT ON COLUMN "public"."teacher"."certificate" IS '教育证书';
COMMENT ON COLUMN "public"."teacher"."certificate_other" IS '教育相关证书其他';
COMMENT ON COLUMN "public"."teacher"."certificate_pic" IS '教育相关证书图片';
COMMENT ON COLUMN "public"."teacher"."subject" IS '可带科目';
COMMENT ON COLUMN "public"."teacher"."subject_other" IS '可带科目其他';
COMMENT ON COLUMN "public"."teacher"."age_group" IS '教学年龄段';
COMMENT ON COLUMN "public"."teacher"."special_exp_other" IS '专项教学体系经验';
COMMENT ON COLUMN "public"."teacher"."company_require" IS '公司要求';
COMMENT ON COLUMN "public"."teacher"."company_require_other" IS '公司要求其他';
COMMENT ON COLUMN "public"."teacher"."picture" IS '照片';
COMMENT ON COLUMN "public"."teacher"."video" IS '视频';
COMMENT ON COLUMN "public"."teacher"."current_location" IS '目前所在地';
COMMENT ON COLUMN "public"."teacher"."working_condition" IS '在职情况';
COMMENT ON COLUMN "public"."teacher"."first_apply_visa" IS '是否第一次办理工作签证';
COMMENT ON COLUMN "public"."teacher"."no_crime" IS '无犯罪记录';
COMMENT ON COLUMN "public"."teacher"."edu_cert" IS '学历认证';
COMMENT ON COLUMN "public"."teacher"."recommand" IS '推荐信';
COMMENT ON COLUMN "public"."teacher"."visa_type" IS '签证类型';
COMMENT ON COLUMN "public"."teacher"."visa_expire" IS '签证到期时间';
COMMENT ON COLUMN "public"."teacher"."expect_entry_time" IS '希望入职时间';
COMMENT ON COLUMN "public"."teacher"."expect_job_city" IS '希望入职城市';
COMMENT ON COLUMN "public"."teacher"."expect_job_city_code" IS '希望入职城市code';
COMMENT ON COLUMN "public"."teacher"."expect_job_prov_code" IS '希望入职省份code（由城市关联得到的省份）';
COMMENT ON COLUMN "public"."teacher"."expect_city_only" IS '只去这些地方or优先考虑这些地方';
COMMENT ON COLUMN "public"."teacher"."expect_salary_start" IS '期望薪资范围左';
COMMENT ON COLUMN "public"."teacher"."expect_salary_end" IS '期望薪资范围右';
COMMENT ON COLUMN "public"."teacher"."need_shelter" IS '需要住宿';
COMMENT ON COLUMN "public"."teacher"."com_people" IS '对接人员';
COMMENT ON COLUMN "public"."teacher"."level" IS '优秀老师标记等级星';
COMMENT ON COLUMN "public"."teacher"."bad_record" IS '不良记录';
COMMENT ON COLUMN "public"."teacher"."bad_record_other" IS '其他不良记录';
COMMENT ON COLUMN "public"."teacher"."label" IS '标签';
COMMENT ON COLUMN "public"."teacher"."commit" IS '评论';
COMMENT ON COLUMN "public"."teacher"."working_seniority_start" IS '工作年限开始';
COMMENT ON COLUMN "public"."teacher"."working_seniority_end" IS '工作年限结束';
COMMENT ON COLUMN "public"."teacher"."user_id" IS '录入外教信息的用户id
';
COMMENT ON COLUMN "public"."teacher"."job_status" IS '求职状态
求职状态';
COMMENT ON COLUMN "public"."teacher"."open_date" IS '下次开放时间';
COMMENT ON COLUMN "public"."teacher"."native_flag" IS '是否母语';
COMMENT ON COLUMN "public"."teacher"."part_time_desc" IS ' ';
COMMENT ON COLUMN "public"."teacher"."surname" IS '用户surname，用于小程序显示';
COMMENT ON COLUMN "public"."teacher"."recruit_id" IS '招募官ID';
COMMENT ON COLUMN "public"."teacher"."recommend_id" IS '推荐官ID';
COMMENT ON COLUMN "public"."teacher"."first_visa_options" IS '签证选项';
COMMENT ON COLUMN "public"."teacher"."other_people" IS '其他对接人员';
COMMENT ON COLUMN "public"."teacher"."virtual" IS '是否虚拟外教';
COMMENT ON COLUMN "public"."teacher"."wx_nickname" IS '微信昵称';
COMMENT ON COLUMN "public"."teacher"."expect_job_province_code" IS '希望入职省份code（单独选择的省份）';
COMMENT ON COLUMN "public"."teacher"."first_name_latin" IS '拉丁名';
COMMENT ON COLUMN "public"."teacher"."surname_latin" IS 'surname latin';

-- ----------------------------
-- Records of teacher
-- ----------------------------

-- ----------------------------
-- Table structure for token_info
-- ----------------------------
DROP TABLE IF EXISTS "public"."token_info";
CREATE TABLE "public"."token_info" (
  "id" int4 NOT NULL,
  "token" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "expire" int8 NOT NULL
)
;

-- ----------------------------
-- Records of token_info
-- ----------------------------

-- ----------------------------
-- Table structure for upload_info
-- ----------------------------
DROP TABLE IF EXISTS "public"."upload_info";
CREATE TABLE "public"."upload_info" (
  "id" int8 NOT NULL DEFAULT nextval('upload_info_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "path" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "size" int8 NOT NULL,
  "creator" int8,
  "other" jsonb,
  "time_created" timestamp(6) NOT NULL DEFAULT now(),
  "time_updated" timestamp(6) NOT NULL DEFAULT now(),
  "teacher_id" int4,
  "teacher_file_id" int4,
  "company_id" int4,
  "company_file_id" int4,
  "offer_id" int4,
  "offer_file_id" int4,
  "picture_id" int4,
  "picture_file_id" int4,
  "picture_order" int4,
  "upload_batch" int8
)
;
COMMENT ON COLUMN "public"."upload_info"."name" IS '文件名';
COMMENT ON COLUMN "public"."upload_info"."path" IS '上传文件路径';
COMMENT ON COLUMN "public"."upload_info"."size" IS '文件大小';
COMMENT ON COLUMN "public"."upload_info"."teacher_file_id" IS '1:个人照片 2:个人视频简介 3:护照照片 4:教育相关证书图片 5:学历证书 6:个人简历 7:其他资料';
COMMENT ON COLUMN "public"."upload_info"."company_file_id" IS '1:合同';
COMMENT ON COLUMN "public"."upload_info"."offer_file_id" IS '1:附件';
COMMENT ON COLUMN "public"."upload_info"."picture_file_id" IS '1:过渡页 2：列表页';
COMMENT ON COLUMN "public"."upload_info"."picture_order" IS '图片顺序';
COMMENT ON COLUMN "public"."upload_info"."upload_batch" IS '上传批次(是否同一次上传，外教其他材料使用此字段)';

-- ----------------------------
-- Records of upload_info
-- ----------------------------

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_info";
CREATE TABLE "public"."user_info" (
  "id" int4 NOT NULL DEFAULT nextval('user_info_id_seq'::regclass),
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "phone" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT ''::character varying,
  "avatar" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT ''::character varying,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT ''::character varying,
  "resume" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT ''::character varying,
  "other" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "time_created" timestamp(6) NOT NULL DEFAULT now(),
  "time_updated" timestamp(6) NOT NULL DEFAULT now(),
  "ent_wechat_id" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of user_info
-- ----------------------------

-- ----------------------------
-- Table structure for user_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_log";
CREATE TABLE "public"."user_log" (
  "id" int8 NOT NULL DEFAULT nextval('user_log_id_seq'::regclass),
  "user_id" int4 NOT NULL,
  "code" int4 NOT NULL,
  "action" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "ip" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "time_created" timestamp(6) NOT NULL DEFAULT now(),
  "table_name" varchar(255) COLLATE "pg_catalog"."default",
  "primary_id" int4,
  "user_name" varchar(255) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."user_log"."user_id" IS '用户id';
COMMENT ON COLUMN "public"."user_log"."code" IS '代码(1用户登录,2用户注册,3用户登出,4修改用户信息,5修改密码,6发布文章,7回复文章,8点赞文章,9取消点赞,10收藏文章,11发帖,12回帖,13收藏帖子)';
COMMENT ON COLUMN "public"."user_log"."action" IS '动作(描述)';
COMMENT ON COLUMN "public"."user_log"."ip" IS 'ip地址';
COMMENT ON COLUMN "public"."user_log"."time_created" IS '发生时间';
COMMENT ON COLUMN "public"."user_log"."primary_id" IS '操作表中的id';

-- ----------------------------
-- Records of user_log
-- ----------------------------

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_role";
CREATE TABLE "public"."user_role" (
  "user_id" int4 NOT NULL,
  "role_id" int4 NOT NULL
)
;

-- ----------------------------
-- Records of user_role
-- ----------------------------

-- ----------------------------
-- Table structure for visitor
-- ----------------------------
DROP TABLE IF EXISTS "public"."visitor";
CREATE TABLE "public"."visitor" (
  "id" int4 NOT NULL DEFAULT nextval('visitor_id_seq'::regclass),
  "openid" varchar(255) COLLATE "pg_catalog"."default",
  "session_key" varchar(255) COLLATE "pg_catalog"."default",
  "phone_number" varchar(255) COLLATE "pg_catalog"."default",
  "phone_info" jsonb DEFAULT '{}'::jsonb,
  "time_created" timestamp(6) NOT NULL DEFAULT now()
)
;
COMMENT ON COLUMN "public"."visitor"."openid" IS '用户唯一标识';
COMMENT ON COLUMN "public"."visitor"."session_key" IS '会话密钥';
COMMENT ON COLUMN "public"."visitor"."phone_number" IS '用户授权号码';
COMMENT ON COLUMN "public"."visitor"."phone_info" IS '用户手机号信息';
COMMENT ON COLUMN "public"."visitor"."time_created" IS '当前时间';

-- ----------------------------
-- Records of visitor
-- ----------------------------

-- ----------------------------
-- Table structure for website
-- ----------------------------
DROP TABLE IF EXISTS "public"."website";
CREATE TABLE "public"."website" (
  "id" int4 NOT NULL DEFAULT nextval('website_id_seq'::regclass),
  "status" varchar(255) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."website"."status" IS 'runging：在用；offline：维护';

-- ----------------------------
-- Records of website
-- ----------------------------

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."comment_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."company_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."favorite_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."match_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."offer_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."order_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."permission_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."role_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sale_order_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."teacher_comment_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."teacher_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."teacher_id_seq11"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."upload_info_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."user_info_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."user_log_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."visitor_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."website_id_seq"', 2, false);

-- ----------------------------
-- Primary Key structure for table cache
-- ----------------------------
ALTER TABLE "public"."cache" ADD CONSTRAINT "cache_pkey" PRIMARY KEY ("key");

-- ----------------------------
-- Primary Key structure for table comment
-- ----------------------------
ALTER TABLE "public"."comment" ADD CONSTRAINT "comment_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table company
-- ----------------------------
ALTER TABLE "public"."company" ADD CONSTRAINT "company_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table favorite
-- ----------------------------
ALTER TABLE "public"."favorite" ADD CONSTRAINT "favorite_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table match
-- ----------------------------
ALTER TABLE "public"."match" ADD CONSTRAINT "match_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table offer
-- ----------------------------
ALTER TABLE "public"."offer" ADD CONSTRAINT "offer_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table order
-- ----------------------------
ALTER TABLE "public"."order" ADD CONSTRAINT "order_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table permission
-- ----------------------------
ALTER TABLE "public"."permission" ADD CONSTRAINT "permission_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table role
-- ----------------------------
ALTER TABLE "public"."role" ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table role_permission
-- ----------------------------
ALTER TABLE "public"."role_permission" ADD CONSTRAINT "role_permission_pkey" PRIMARY KEY ("role_id", "permission_id");

-- ----------------------------
-- Primary Key structure for table sale_order
-- ----------------------------
ALTER TABLE "public"."sale_order" ADD CONSTRAINT "sale_order_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table token_info
-- ----------------------------
ALTER TABLE "public"."token_info" ADD CONSTRAINT "token_info_token_key" UNIQUE ("token");

-- ----------------------------
-- Primary Key structure for table token_info
-- ----------------------------
ALTER TABLE "public"."token_info" ADD CONSTRAINT "token_info_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table upload_info
-- ----------------------------
ALTER TABLE "public"."upload_info" ADD CONSTRAINT "upload_info_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table user_info
-- ----------------------------
ALTER TABLE "public"."user_info" ADD CONSTRAINT "user_info_username_key" UNIQUE ("username");

-- ----------------------------
-- Primary Key structure for table user_info
-- ----------------------------
ALTER TABLE "public"."user_info" ADD CONSTRAINT "user_info_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table user_log
-- ----------------------------
ALTER TABLE "public"."user_log" ADD CONSTRAINT "device_log_copy1_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table user_role
-- ----------------------------
ALTER TABLE "public"."user_role" ADD CONSTRAINT "user_role_pkey" PRIMARY KEY ("user_id", "role_id");

-- ----------------------------
-- Primary Key structure for table visitor
-- ----------------------------
ALTER TABLE "public"."visitor" ADD CONSTRAINT "visitor_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table website
-- ----------------------------
ALTER TABLE "public"."website" ADD CONSTRAINT "website_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table role_permission
-- ----------------------------
ALTER TABLE "public"."role_permission" ADD CONSTRAINT "role_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "public"."permission" ("id") ON DELETE SET DEFAULT ON UPDATE NO ACTION;
ALTER TABLE "public"."role_permission" ADD CONSTRAINT "role_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role" ("id") ON DELETE SET DEFAULT ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table token_info
-- ----------------------------
ALTER TABLE "public"."token_info" ADD CONSTRAINT "token_info_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."user_info" ("id") ON DELETE SET DEFAULT ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table upload_info
-- ----------------------------
ALTER TABLE "public"."upload_info" ADD CONSTRAINT "upload_info_creator_fkey" FOREIGN KEY ("creator") REFERENCES "public"."user_info" ("id") ON DELETE SET DEFAULT ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table user_log
-- ----------------------------
ALTER TABLE "public"."user_log" ADD CONSTRAINT "user_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_info" ("id") ON DELETE SET DEFAULT ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table user_role
-- ----------------------------
ALTER TABLE "public"."user_role" ADD CONSTRAINT "user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role" ("id") ON DELETE SET DEFAULT ON UPDATE NO ACTION;
ALTER TABLE "public"."user_role" ADD CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_info" ("id") ON DELETE SET DEFAULT ON UPDATE NO ACTION;
