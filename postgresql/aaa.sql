select a.* from teacher a 
left join dict b
on b.type= 4 and b.sub_id in (ARRAY_TO_STRING(a.age_group, ','))


select id,ARRAY_TO_STRING(age_group, ',') from teacher group by id,age_group

select type, ARRAY_TO_STRING(sub_name, ',') from dict group by type,sub_name



select type, string_agg(sub_name,',') from dict where sub_id in (1,2) group by type;
select id, DISTINCT (xx),DISTINCT (yy) from
(
select a.id ,array_agg(b.sub_name) xx,array_agg(c.sub_name) yy from teacher a
left join dict b
on b.type = 4 and b.sub_id = ANY (ARRAY[a.age_group] )
left join dict c
on c.type = 2 and c.sub_id = ANY (ARRAY[a.certificate] )
--and a.id=1042 
group by a.id
)x

select sub_name from dict where type = 4 and sub_id = ANY (ARRAY[1,2] )


select a.id from teacher a
left join dict b
on 
SELECT type, string_agg(sub_name,',') FROM dict WHERE type=4 and sub_id = ANY (ARRAY(select age_group from teacher where id =176)) group by type

select age_group from teacher where id =176


select * from
(
select a.id
,string_agg(b.sub_name,',') age_group_str
,string_agg(c.sub_name,',') certificate_str 
from teacher a
left join dict b on b.type=4 and b.sub_id = ANY (ARRAY(select case when age_group = '{}' then array[0] else age_group end from teacher where id =a.id)) 
left join dict c on c.type=2 and c.sub_id = ANY (ARRAY(select case when certificate = '{}' then array[0] else certificate end from teacher where id =a.id)) 
where a.id=1042 
group by a.id
) x
where to_tsvector('chinese', certificate_str) @@ to_tsquery('chinese','教师资质')



select a.id
,b.sub_name age_group_str
,c.sub_name certificate_str 
from teacher a
left join dict b on b.type=4 and b.sub_id = ANY (ARRAY(select case when age_group = '{}' then array[0] else age_group end from teacher where id =a.id)) 
left join dict c on c.type=2 and c.sub_id = ANY (ARRAY(select case when certificate = '{}' then array[0] else certificate end from teacher where id =a.id)) 
where a.id=1042 
