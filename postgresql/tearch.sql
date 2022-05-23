SELECT A.*,
	x.age_group_str,
	x.certificate_str,
	x.subject_str,
	x.special_exp_str,
	x.bad_record_str 
	,case when A.job_status=1 then 1                                                      --add by zhy 
		    when A.job_status=2 and date(current_date)-date(A.expect_entry_time)<=30        --add by zhy 
	  		     and date(A.expect_entry_time)-date(current_date)<=150  then 2              --add by zhy 
				  when A.job_status=4 and date(current_date)-date(A.open_date)<=30              --add by zhy 
				     and date(A.open_date)-date(current_date)<=150  then 3                      --add by zhy 
		    when A.job_status=3 then 4                                                      --add by zhy 
		else 5 end as job_status_order                                                      --add by zhy 
	,case when A.native_flag is true then 1 else 2 end native_flag_order                  --add by zhy 
FROM
	 (
	  SELECT A.*,
	  	dict1.sub_name job_status_str,
	  	dict2.sub_name education_str,
	  	b.avatar_file,
	  	b.video_file,
	  	b.passport_file,
	  	b.certificate_file,
	  	b.education_file,
	  	b.resume_file,
	  	b.other_file,
	  	o.interview_status,
		  comm.comments 
	  FROM teacher A 
	       LEFT JOIN dict dict1 ON A.job_status = dict1.sub_id AND dict1.TYPE = 7
		     LEFT JOIN dict dict2 ON A.education = dict2.sub_id AND dict2.TYPE = 1
		     LEFT JOIN ( SELECT teacher_id, string_agg ( interview_status, ',' ) AS interview_status FROM "order" GROUP BY teacher_id ) o ON A.ID = o.teacher_id
		     LEFT JOIN (
		                 SELECT
		                 	teacher_id,
		                 	string_agg ( REPLACE ( CAST ( COMMENT AS VARCHAR ), '"', '' ), ',' ) AS comments 
		                 FROM
		                 COMMENT 
		                 GROUP BY
		                 	teacher_id 
		               ) comm ON A.ID = comm.teacher_id
		     LEFT OUTER JOIN (
	                  	      SELECT
	                  	      	 teacher_id,
	                  	         MAX ( CASE WHEN teacher_file_id = 1 THEN file_ids ELSE NULL END ) avatar_file,
	                             MAX ( CASE WHEN teacher_file_id = 2 THEN file_ids ELSE NULL END ) video_file,
	                             MAX ( CASE WHEN teacher_file_id = 3 THEN file_ids ELSE NULL END ) passport_file,
	                             MAX ( CASE WHEN teacher_file_id = 4 THEN file_ids ELSE NULL END ) certificate_file,
	                             MAX ( CASE WHEN teacher_file_id = 5 THEN file_ids ELSE NULL END ) education_file,
	                             MAX ( CASE WHEN teacher_file_id = 6 THEN file_ids ELSE NULL END ) resume_file,
	                             MAX ( CASE WHEN teacher_file_id = 7 THEN file_ids ELSE NULL END ) other_file 
                            FROM
	                             (
	                               SELECT
	                  	              teacher_id,
	                  	              string_agg ( concat ( ID, '' ), ',' ) AS file_ids,
	                  	              teacher_file_id 
	                                FROM upload_info 
	                                WHERE teacher_id IS NOT NULL 
	                                GROUP BY
	                  	            teacher_id,
	                  	            teacher_file_id 
	                              ) x 
                              GROUP BY teacher_id 
	                         ) b ON A.ID = b.teacher_id 
	    ) A 
      	LEFT JOIN (
      	             SELECT A.ID,
      	             	array_to_string( ARRAY_AGG ( DISTINCT b.sub_name ), ',' ) age_group_str,
      	             	array_to_string( ARRAY_AGG ( DISTINCT C.sub_name ), ',' ) certificate_str,
      	             	array_to_string( ARRAY_AGG ( DISTINCT d.sub_name ), ',' ) subject_str,
      	             	array_to_string( ARRAY_AGG ( DISTINCT e.sub_name ), ',' ) special_exp_str,
      	             	array_to_string( ARRAY_AGG ( DISTINCT f.sub_name ), ',' ) bad_record_str 
      	             FROM
      	             	teacher
      	             	A LEFT JOIN dict b ON b.TYPE = 4 
      	             	AND b.sub_id = ANY ( A.age_group )
      	             	LEFT JOIN dict C ON C.TYPE = 2 
      	             	AND C.sub_id = ANY ( A.certificate )
      	             	LEFT JOIN dict d ON d.TYPE = 3 
      	             	AND d.sub_id = ANY ( A.subject )
      	             	LEFT JOIN dict e ON e.TYPE = 5 
      	             	AND e.sub_id = ANY ( A.special_exp )
      	             	LEFT JOIN dict f ON f.TYPE = 10 
      	             	AND f.sub_id = ANY ( A.bad_record ) 
      	             GROUP BY	A.ID 
      	          ) x ON x.ID = A.ID 
      WHERE    1=1  and a.current_location && '{"110000"}'  and (expect_job_city_code @> '["110000","120000","500000"]'::jsonb 
            or expect_job_city_code='[]')   or (expect_job_prov_code @> '["120000"]'::jsonb or expect_job_prov_code='[]')   
            or (expect_job_province_code @> '["120000"]'::jsonb or expect_job_province_code='[]')  
            and to_tsvector('chinese', first_name || ' '|| phone || ' '|| COALESCE(surname,' ')|| national || ' '|| wechat || ' '|| email || ' '|| COALESCE(wx_nickname,' ')|| COALESCE(first_name_latin,' ')|| COALESCE(surname_latin,' ')|| COALESCE(job_status_str,' ')|| COALESCE(education_str,' ')|| case when virtual = true then ' 虚拟 virtual ' else '' end|| array_to_string(current_location, ',' ) || ' '|| array_to_string(first_visa_options, ',') || ' '|| (expect_job_city::jsonb #>>'{}')::varchar || ' '|| COALESCE(comments,' ')|| COALESCE(x.certificate_str,' ')|| COALESCE(x.age_group_str,' ')|| COALESCE(x.subject_str,' ')|| COALESCE(x.special_exp_str,' ')|| COALESCE(x.bad_record_str,' ')) @@ to_tsquery('chinese', 'kent')
            
            and date(a.open_date)-date(current_date) <150  --近5个月内                          --add by zhy 
            and a.level=5 --五星用户                                                            --add by zhy 
     order by case when A.job_status=1 then 1                                                   --add by zhy 
		               when A.job_status=2 and date(current_date)-date(A.expect_entry_time)<=30     --add by zhy 
	             		     and date(A.expect_entry_time)-date(current_date)<=150  then 2            --add by zhy 
		           		  when A.job_status=4 and date(current_date)-date(A.open_date)<=30            --add by zhy 
		           		     and date(A.open_date)-date(current_date)<=150  then 3                    --add by zhy 
		               when A.job_status=3 then 4                                                   --add by zhy 
		           else 5 end                                                                       --add by zhy 
		           ,case when A.native_flag is true then 1 else 2 end                               --add by zhy 
		           ,a.time_created                                                                  --add by zhy 