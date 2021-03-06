/*
 Navicat Premium Data Transfer

 Source Server         : postgres13@192.168.1.33
 Source Server Type    : PostgreSQL
 Source Server Version : 130006
 Source Host           : 192.168.1.33:9432
 Source Catalog        : foreign_teacher
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 130006
 File Encoding         : 65001

 Date: 09/05/2022 01:23:01
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
-- Table structure for cmda_exec
-- ----------------------------
DROP TABLE IF EXISTS "public"."cmda_exec";
CREATE TABLE "public"."cmda_exec" (
  "cmda_output" text COLLATE "pg_catalog"."default"
)
;

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
  "time_updated" timestamp(6) NOT NULL DEFAULT now()
)
;
COMMENT ON COLUMN "public"."comment"."id" IS 'id';
COMMENT ON COLUMN "public"."comment"."teacher_id" IS '??????ID';
COMMENT ON COLUMN "public"."comment"."user_id" IS '??????ID';
COMMENT ON COLUMN "public"."comment"."comment" IS '??????';
COMMENT ON COLUMN "public"."comment"."time_created" IS '??????????????????';
COMMENT ON COLUMN "public"."comment"."time_updated" IS '??????????????????';

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
COMMENT ON COLUMN "public"."company"."name" IS '????????????';
COMMENT ON COLUMN "public"."company"."location" IS '????????????';
COMMENT ON COLUMN "public"."company"."level" IS '?????????';
COMMENT ON COLUMN "public"."company"."principal" IS '?????????';
COMMENT ON COLUMN "public"."company"."principal_post" IS '???????????????';
COMMENT ON COLUMN "public"."company"."principal_phone" IS '??????????????????';
COMMENT ON COLUMN "public"."company"."principal_email" IS '???????????????';
COMMENT ON COLUMN "public"."company"."principal_wechat" IS '???????????????';
COMMENT ON COLUMN "public"."company"."contract" IS '??????';
COMMENT ON COLUMN "public"."company"."contract_other" IS '??????????????????';
COMMENT ON COLUMN "public"."company"."contract_status" IS '????????????';
COMMENT ON COLUMN "public"."company"."contract_expect" IS '????????????';
COMMENT ON COLUMN "public"."company"."contract_note" IS '??????';
COMMENT ON COLUMN "public"."company"."payment" IS '????????????';
COMMENT ON COLUMN "public"."company"."pay_expiry" IS '???????????????';
COMMENT ON COLUMN "public"."company"."pay_agreement" IS '??????????????????';
COMMENT ON COLUMN "public"."company"."contract_post" IS '??????????????????';
COMMENT ON COLUMN "public"."company"."bill" IS '????????????';
COMMENT ON COLUMN "public"."company"."bill_note" IS '????????????????????????';

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
COMMENT ON COLUMN "public"."favorite"."openid" IS '?????????openid';
COMMENT ON COLUMN "public"."favorite"."favorite" IS '??????';

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
  "offer_num" varchar COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."offer"."label" IS '????????????????????????';
COMMENT ON COLUMN "public"."offer"."title" IS '??????';
COMMENT ON COLUMN "public"."offer"."description" IS '????????????';
COMMENT ON COLUMN "public"."offer"."description_file" IS '??????????????????';
COMMENT ON COLUMN "public"."offer"."company_id" IS '??????id';
COMMENT ON COLUMN "public"."offer"."location" IS '???????????????';
COMMENT ON COLUMN "public"."offer"."near_subway" IS '??????????????????';
COMMENT ON COLUMN "public"."offer"."voice" IS '????????????';
COMMENT ON COLUMN "public"."offer"."org_type" IS '????????????';
COMMENT ON COLUMN "public"."offer"."provide_visa" IS '??????????????????';
COMMENT ON COLUMN "public"."offer"."salary_scope" IS '????????????';
COMMENT ON COLUMN "public"."offer"."housing_allowance" IS '????????????';
COMMENT ON COLUMN "public"."offer"."hiring_time" IS '????????????';
COMMENT ON COLUMN "public"."offer"."other_require" IS '????????????';
COMMENT ON COLUMN "public"."offer"."org_name" IS '????????????';
COMMENT ON COLUMN "public"."offer"."other_welfare_treatment" IS '??????????????????';
COMMENT ON COLUMN "public"."offer"."on_board_time" IS '????????????';
COMMENT ON COLUMN "public"."offer"."org_location" IS '????????????';
COMMENT ON COLUMN "public"."offer"."skin_color" IS '????????????';
COMMENT ON COLUMN "public"."offer"."offer_num" IS '????????????';

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
  "real_on_board_time" timestamp(6)
)
;
COMMENT ON COLUMN "public"."order"."id" IS 'id';
COMMENT ON COLUMN "public"."order"."order_no" IS '????????????';
COMMENT ON COLUMN "public"."order"."teacher_id" IS '??????id';
COMMENT ON COLUMN "public"."order"."teacher_name" IS '????????????';
COMMENT ON COLUMN "public"."order"."company_id" IS '??????id';
COMMENT ON COLUMN "public"."order"."company_name" IS '????????????';
COMMENT ON COLUMN "public"."order"."user_id" IS '??????id';
COMMENT ON COLUMN "public"."order"."principal_post" IS '??????';
COMMENT ON COLUMN "public"."order"."interview_status" IS '??????????????????';
COMMENT ON COLUMN "public"."order"."financial_status" IS '??????????????????';
COMMENT ON COLUMN "public"."order"."time_created" IS '????????????';
COMMENT ON COLUMN "public"."order"."time_updated" IS '????????????';
COMMENT ON COLUMN "public"."order"."recommend_id" IS '?????????ID';
COMMENT ON COLUMN "public"."order"."is_channel" IS '???????????????';
COMMENT ON COLUMN "public"."order"."channel_fee" IS '????????????';
COMMENT ON COLUMN "public"."order"."payment" IS '????????????';
COMMENT ON COLUMN "public"."order"."pay_time" IS '????????????';
COMMENT ON COLUMN "public"."order"."is_bill" IS '????????????';
COMMENT ON COLUMN "public"."order"."real_fee" IS '????????????';
COMMENT ON COLUMN "public"."order"."collected_time" IS '????????????';
COMMENT ON COLUMN "public"."order"."balance" IS '????????????';
COMMENT ON COLUMN "public"."order"."bill_time" IS '????????????';
COMMENT ON COLUMN "public"."order"."bill_note" IS '????????????';
COMMENT ON COLUMN "public"."order"."offer_id" IS '??????ID';
COMMENT ON COLUMN "public"."order"."order_time" IS '????????????';
COMMENT ON COLUMN "public"."order"."channel_name" IS '????????????';
COMMENT ON COLUMN "public"."order"."remark" IS '??????';
COMMENT ON COLUMN "public"."order"."real_contract_time" IS '??????????????????';
COMMENT ON COLUMN "public"."order"."real_on_board_time" IS '??????????????????';

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
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS "public"."role";
CREATE TABLE "public"."role" (
  "id" int4 NOT NULL DEFAULT nextval('role_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

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
COMMENT ON COLUMN "public"."sale_order"."order_no" IS '????????????';
COMMENT ON COLUMN "public"."sale_order"."project_name" IS '????????????';
COMMENT ON COLUMN "public"."sale_order"."develop_cycle" IS '????????????';
COMMENT ON COLUMN "public"."sale_order"."project_date" IS '????????????';
COMMENT ON COLUMN "public"."sale_order"."project_progress" IS '????????????';
COMMENT ON COLUMN "public"."sale_order"."return_cycle" IS '????????????';

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
  "expect_job_province_code" jsonb NOT NULL DEFAULT '[]'::jsonb
)
;
COMMENT ON COLUMN "public"."teacher"."number" IS '??????';
COMMENT ON COLUMN "public"."teacher"."first_name" IS '???';
COMMENT ON COLUMN "public"."teacher"."second_name" IS '???';
COMMENT ON COLUMN "public"."teacher"."birthday" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."gender" IS '??????';
COMMENT ON COLUMN "public"."teacher"."passport" IS '??????';
COMMENT ON COLUMN "public"."teacher"."passport_pic" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."national" IS '??????';
COMMENT ON COLUMN "public"."teacher"."phone" IS '?????????';
COMMENT ON COLUMN "public"."teacher"."wechat" IS '??????';
COMMENT ON COLUMN "public"."teacher"."email" IS '??????';
COMMENT ON COLUMN "public"."teacher"."education" IS '??????';
COMMENT ON COLUMN "public"."teacher"."education_pic" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."certificate" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."certificate_other" IS '????????????????????????';
COMMENT ON COLUMN "public"."teacher"."certificate_pic" IS '????????????????????????';
COMMENT ON COLUMN "public"."teacher"."subject" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."subject_other" IS '??????????????????';
COMMENT ON COLUMN "public"."teacher"."age_group" IS '???????????????';
COMMENT ON COLUMN "public"."teacher"."special_exp_other" IS '????????????????????????';
COMMENT ON COLUMN "public"."teacher"."company_require" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."company_require_other" IS '??????????????????';
COMMENT ON COLUMN "public"."teacher"."picture" IS '??????';
COMMENT ON COLUMN "public"."teacher"."video" IS '??????';
COMMENT ON COLUMN "public"."teacher"."current_location" IS '???????????????';
COMMENT ON COLUMN "public"."teacher"."working_condition" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."first_apply_visa" IS '?????????????????????????????????';
COMMENT ON COLUMN "public"."teacher"."no_crime" IS '???????????????';
COMMENT ON COLUMN "public"."teacher"."edu_cert" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."recommand" IS '?????????';
COMMENT ON COLUMN "public"."teacher"."visa_type" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."visa_expire" IS '??????????????????';
COMMENT ON COLUMN "public"."teacher"."expect_entry_time" IS '??????????????????';
COMMENT ON COLUMN "public"."teacher"."expect_job_city" IS '??????????????????';
COMMENT ON COLUMN "public"."teacher"."expect_job_city_code" IS '??????????????????code';
COMMENT ON COLUMN "public"."teacher"."expect_job_prov_code" IS '??????????????????code????????????????????????????????????';
COMMENT ON COLUMN "public"."teacher"."expect_city_only" IS '??????????????????or????????????????????????';
COMMENT ON COLUMN "public"."teacher"."expect_salary_start" IS '?????????????????????';
COMMENT ON COLUMN "public"."teacher"."expect_salary_end" IS '?????????????????????';
COMMENT ON COLUMN "public"."teacher"."need_shelter" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."com_people" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."level" IS '???????????????????????????';
COMMENT ON COLUMN "public"."teacher"."bad_record" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."bad_record_other" IS '??????????????????';
COMMENT ON COLUMN "public"."teacher"."label" IS '??????';
COMMENT ON COLUMN "public"."teacher"."commit" IS '??????';
COMMENT ON COLUMN "public"."teacher"."working_seniority_start" IS '??????????????????';
COMMENT ON COLUMN "public"."teacher"."working_seniority_end" IS '??????????????????';
COMMENT ON COLUMN "public"."teacher"."user_id" IS '???????????????????????????id
';
COMMENT ON COLUMN "public"."teacher"."job_status" IS '????????????
????????????';
COMMENT ON COLUMN "public"."teacher"."open_date" IS '??????????????????';
COMMENT ON COLUMN "public"."teacher"."native_flag" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."part_time_desc" IS ' ';
COMMENT ON COLUMN "public"."teacher"."surname" IS '??????surname????????????????????????';
COMMENT ON COLUMN "public"."teacher"."recruit_id" IS '?????????ID';
COMMENT ON COLUMN "public"."teacher"."recommend_id" IS '?????????ID';
COMMENT ON COLUMN "public"."teacher"."first_visa_options" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."other_people" IS '??????????????????';
COMMENT ON COLUMN "public"."teacher"."virtual" IS '??????????????????';
COMMENT ON COLUMN "public"."teacher"."wx_nickname" IS '????????????';
COMMENT ON COLUMN "public"."teacher"."expect_job_province_code" IS '??????????????????code???????????????????????????';

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
  "picture_order" int4
)
;
COMMENT ON COLUMN "public"."upload_info"."name" IS '?????????';
COMMENT ON COLUMN "public"."upload_info"."path" IS '??????????????????';
COMMENT ON COLUMN "public"."upload_info"."size" IS '????????????';
COMMENT ON COLUMN "public"."upload_info"."teacher_file_id" IS '1:???????????? 2:?????????????????? 3:???????????? 4:???????????????????????? 5:???????????? 6:????????????';
COMMENT ON COLUMN "public"."upload_info"."company_file_id" IS '1:??????';
COMMENT ON COLUMN "public"."upload_info"."offer_file_id" IS '1:??????';
COMMENT ON COLUMN "public"."upload_info"."picture_file_id" IS '1:????????? 2????????????';
COMMENT ON COLUMN "public"."upload_info"."picture_order" IS '????????????';

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
COMMENT ON COLUMN "public"."user_log"."user_id" IS '??????id';
COMMENT ON COLUMN "public"."user_log"."code" IS '??????(1????????????,2????????????,3????????????,4??????????????????,5????????????,6????????????,7????????????,8????????????,9????????????,10????????????,11??????,12??????,13????????????)';
COMMENT ON COLUMN "public"."user_log"."action" IS '??????(??????)';
COMMENT ON COLUMN "public"."user_log"."ip" IS 'ip??????';
COMMENT ON COLUMN "public"."user_log"."time_created" IS '????????????';
COMMENT ON COLUMN "public"."user_log"."primary_id" IS '???????????????id';

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
COMMENT ON COLUMN "public"."visitor"."openid" IS '??????????????????';
COMMENT ON COLUMN "public"."visitor"."session_key" IS '????????????';
COMMENT ON COLUMN "public"."visitor"."phone_number" IS '??????????????????';
COMMENT ON COLUMN "public"."visitor"."phone_info" IS '?????????????????????';
COMMENT ON COLUMN "public"."visitor"."time_created" IS '????????????';

-- ----------------------------
-- Table structure for website
-- ----------------------------
DROP TABLE IF EXISTS "public"."website";
CREATE TABLE "public"."website" (
  "id" int4 NOT NULL DEFAULT nextval('website_id_seq'::regclass),
  "status" varchar(255) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."website"."status" IS 'runging????????????offline?????????';

-- ----------------------------
-- Function structure for sync_zhprs_custom_word
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."sync_zhprs_custom_word"();
CREATE OR REPLACE FUNCTION "public"."sync_zhprs_custom_word"()
  RETURNS "pg_catalog"."void" AS $BODY$
declare
	data_dir text;
	dict_path text;
	time_tag_path text;
	query text;
begin
	select setting from pg_settings where name='data_directory' into data_dir;

	select data_dir || '/base/' || '/zhprs_dict_' || current_database() || '.txt' into dict_path;
	select data_dir || '/base/' || '/zhprs_dict_' || current_database() || '.tag' into time_tag_path;

	query = 'copy (select word, tf, idf, attr from zhparser.zhprs_custom_word) to ' || chr(39) || dict_path || chr(39) || ' encoding ' || chr(39) || 'utf8' || chr(39) ;
	execute query;
	query = 'copy (select now()) to ' || chr(39) || time_tag_path || chr(39) ;
	execute query;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for zhprs_end
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."zhprs_end"(internal);
CREATE OR REPLACE FUNCTION "public"."zhprs_end"(internal)
  RETURNS "pg_catalog"."void" AS '$libdir/zhparser', 'zhprs_end'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for zhprs_getlexeme
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."zhprs_getlexeme"(internal, internal, internal);
CREATE OR REPLACE FUNCTION "public"."zhprs_getlexeme"(internal, internal, internal)
  RETURNS "pg_catalog"."internal" AS '$libdir/zhparser', 'zhprs_getlexeme'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for zhprs_lextype
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."zhprs_lextype"(internal);
CREATE OR REPLACE FUNCTION "public"."zhprs_lextype"(internal)
  RETURNS "pg_catalog"."internal" AS '$libdir/zhparser', 'zhprs_lextype'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for zhprs_start
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."zhprs_start"(internal, int4);
CREATE OR REPLACE FUNCTION "public"."zhprs_start"(internal, int4)
  RETURNS "pg_catalog"."internal" AS '$libdir/zhparser', 'zhprs_start'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."comment_id_seq"', 2686, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."company_id_seq"
OWNED BY "public"."company"."id";
SELECT setval('"public"."company_id_seq"', 58, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."favorite_id_seq"', 550, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."match_id_seq"
OWNED BY "public"."match"."id";
SELECT setval('"public"."match_id_seq"', 11, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."offer_id_seq"
OWNED BY "public"."offer"."id";
SELECT setval('"public"."offer_id_seq"', 467, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."order_id_seq"', 135, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."permission_id_seq"
OWNED BY "public"."permission"."id";
SELECT setval('"public"."permission_id_seq"', 18, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."role_id_seq"
OWNED BY "public"."role"."id";
SELECT setval('"public"."role_id_seq"', 18, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sale_order_id_seq"', 7, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."teacher_comment_id_seq"', 9, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."teacher_id_seq"', 1055, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."teacher_id_seq11"', 8, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."upload_info_id_seq"
OWNED BY "public"."upload_info"."id";
SELECT setval('"public"."upload_info_id_seq"', 3057, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."user_info_id_seq"
OWNED BY "public"."user_info"."id";
SELECT setval('"public"."user_info_id_seq"', 117, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."user_log_id_seq"
OWNED BY "public"."user_log"."id";
SELECT setval('"public"."user_log_id_seq"', 2851, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."visitor_id_seq"
OWNED BY "public"."visitor"."id";
SELECT setval('"public"."visitor_id_seq"', 622, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."website_id_seq"', 5, true);

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
