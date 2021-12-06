from django.db import models
import os
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext as _
from django.contrib.auth.models import User
from jsonfield import JSONField


class Unit(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255L,blank=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
	db_table = "explore_plus_unit"
        app_label = 'main'


# template.variable_set.add(variable)
class Template(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255L,blank=True,null=True)
    description = models.CharField(max_length=500L,blank=True,null=True)
    sector = models.CharField(max_length=500L,blank=True,null=True)
    #variable = models.CharField(max_length=255L,blank=True,null=True)
    format = models.CharField(max_length=255L,blank=True,null=True)
    #org_id = models.IntegerField(null=False,blank=False)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
	db_table = "explore_plus_template"
        app_label = 'main'

class Variable(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255L,blank=True,null=True)
    description = models.CharField(max_length=5000L,blank=True,null=True)
    formula = models.CharField(max_length=500L,blank=True,null=True)
    source = models.CharField(max_length=500L,blank=True,null=True)
    unit_id = models.IntegerField(null=True,blank=True)
    variabletype = models.CharField(max_length=255L,blank=True,null=True)
    datatype = models.CharField(max_length=255L,blank=True,null=True)
    datatype1 = models.CharField(max_length=255L,blank=True,null=True)
    templates = models.ManyToManyField(Template)
    formula_id = models.CharField(max_length=255L,blank=True,null=True)
    variable_key = models.CharField(max_length=255L,blank=True,null=True)
    formula_steps = models.CharField(max_length=10L,blank=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
	db_table = "explore_plus_variable"
        app_label = 'main'

class VariableProduct(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255L,blank=True,null=True)
    variable_id = models.IntegerField(null=False,blank=False)
    template_id = models.IntegerField(null=False,blank=False)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
	db_table = "explore_plus_variableproduct"
        app_label = 'main'

class MyTemplate(models.Model):
    id = models.AutoField(primary_key=True)
    template = models.ForeignKey(Template,null=True,blank=True)
    template_json = JSONField(default=lambda: {},blank=True)
    levels_mapping = JSONField(default=lambda: {},blank=True)
    minmax = JSONField(default=lambda: {},blank=True)
    template_path = models.CharField(max_length=255L,blank=True,null=True)
    org_id = models.IntegerField(null=False,blank=False)
    mytemplate_name = models.CharField(max_length=255L,blank=True,null=True)

    class Meta:
	db_table = "explore_plus_mytemplate"
        app_label = 'main'

class CustomerDatasetUpload(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(null=False,blank=False)
    org_id = models.IntegerField(null=False,blank=False)
    #mytmplate = models.ForeignKey(MyTemplate,null=True,blank=True)
    mytemplate_id = models.IntegerField(null=False,blank=False)
    file_name = models.CharField(max_length=255L,blank=True,null=True)
    file_format = models.CharField(max_length=500L,blank=True,null=True)
    file_path = models.CharField(max_length=500L,blank=True,null=True)
    author = models.CharField(max_length=500L,blank=True,null=True)
    status = models.CharField(max_length=255L,blank=True,null=True)
    region = models.CharField(max_length=255L,blank=True,null=True)
    raw_obj_id = models.CharField(max_length=255L,blank=True,null=True)
    processed_obj_id = models.CharField(max_length=255L,blank=True,null=True)
    category = models.CharField(max_length=255L,blank=True,null=True)
    uploaded_date = models.CharField(max_length=10L,blank=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    raw_insert_status = models.CharField(max_length=20L,blank=True,null=True)
    processed_insert_status = models.CharField(max_length=20L,blank=True,null=True)
    raw_status = models.CharField(max_length=20L,blank=True,null=True)
    processed_status = models.CharField(max_length=20L,blank=True,null=True)
    rank_status = models.CharField(max_length=20L,blank=True,null=True)

    class Meta:
	db_table = "explore_plus_customerdataset"
        app_label = 'main'

class UploadLog(models.Model):
    id=models.AutoField(primary_key=True)
    user_id = models.IntegerField(null=False,blank=False)
    mytemplate_id = models.IntegerField(null=False,blank=False)
    log_json = JSONField(default=lambda: {},blank=True)
    status = models.CharField(max_length=255L,blank=True,null=True)
    uploaded_date = models.DateTimeField(auto_now_add=True)

    class Meta:
	db_table = "explore_plus_uploadlog"
        app_label = 'main'


class JobMaster(models.Model):
    id = models.AutoField(primary_key=True)
    jobtitle = models.CharField(max_length=255L,blank=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
	db_table = "explore_plus_jobmaster"
        app_label = 'main'

class JobConfigure(models.Model):
    id = models.AutoField(primary_key=True)
    template_id = models.IntegerField(null=True,blank=True)
    variable_id = models.IntegerField(null=True,blank=True)
    job_id = models.CommaSeparatedIntegerField(max_length = 200)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
	db_table = "explore_plus_jobconfigure"
        app_label = 'main'

class JobExecution(models.Model):
    id = models.AutoField(primary_key=True)
    doc_id = models.CharField(max_length=255L,blank=True,null=True)
    jobconfigure_id = models.IntegerField(null=True,blank=True)
    job_id = models.IntegerField(null=True,blank=True)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    execution_status = models.CharField(max_length=255L,blank=True,null=True)

    class Meta:
	db_table = "explore_plus_jobexecution"
        app_label = 'main'
    

class ModelMaster(models.Model):
    id = models.AutoField(primary_key=True)
    model_key = models.CharField(max_length=255L,blank=True,null=True)
    model_name = models.CharField(max_length=255L,blank=True,null=True)
    description = models.CharField(max_length=1000L,blank=True,null=True)
    template_id = models.IntegerField(blank=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    independent_variable = models.TextField(null=True)
    deployer_model_name = models.CharField(max_length=255L,blank=True,null=True)
    files_to_load = models.TextField(null=True)
    model_build_file = models.CharField(max_length=255L,blank=True,null=True)
    model_execute_file = models.CharField(max_length=255L,blank=True,null=True)

    class Meta:
	db_table = "model_modelmaster"
        app_label = 'main'

class UserModel(models.Model):
    id = models.AutoField(primary_key=True)
    model_id = models.ForeignKey(ModelMaster)
    version = models.CharField(max_length=10L,blank=True,null=True)
    model_score_key = models.CharField(max_length=255L,blank=True,null=True)
    model_score_name = models.CharField(max_length=255L,blank=True,null=True)
    description = models.CharField(max_length=1000L,blank=True,null=True)
    date = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    type = models.CharField(max_length=255L,blank=True,null=True)
    data_constraints = models.CharField(max_length=255L,blank=True,null=True)
    key_variables = JSONField(default=lambda: {},blank=True)
    training_set = models.IntegerField(blank=True,null=True)
    test_set = models.IntegerField(blank=True,null=True)
    accuracy = models.CharField(max_length=255L,blank=True,null=True)
    tpr = models.CharField(max_length=255L,blank=True,null=True)
    tt = models.CharField(max_length=255L,blank=True,null=True)
    roc = models.CharField(max_length=255L,blank=True,null=True)
    model_score_range = JSONField(default=lambda: {},blank=True)
    template_id = models.IntegerField(blank=True,null=True)
    variable_id = models.IntegerField(blank=True,null=True)
    variable_key = models.CharField(max_length=255L,blank=True,null=True)
    geography_id = models.IntegerField(blank=True,null=True)
    user_id = models.IntegerField(blank=True,null=True)
    org_id = models.IntegerField(blank=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    status = models.CharField(max_length=255L,blank=True,null=True)
    updated_date = models.DateTimeField(auto_now_add=True,blank=True,null=True)

    class Meta:
	db_table = "model_usermodel"
        app_label = 'main'


class ModelJob(models.Model):
    id = models.AutoField(primary_key=True)
    user_model_id = models.ForeignKey(UserModel)
    user_id = models.IntegerField(blank=True,null=True)
    org_id = models.IntegerField(blank=True,null=True)
    geography_id = models.IntegerField(blank=True,null=True)
    status = models.CharField(max_length=255L,blank=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True,blank=True,null=True)

    class Meta:
	db_table = "model_modeljob"
        app_label = 'main'
