# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'UserModel'
        db.create_table('model_usermodel', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('model_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['main.ModelMaster'])),
            ('version', self.gf('django.db.models.fields.CharField')(max_length=10L, null=True, blank=True)),
            ('model_score_key', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('model_score_name', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('description', self.gf('django.db.models.fields.CharField')(max_length=1000L, null=True, blank=True)),
            ('date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, null=True, blank=True)),
            ('type', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('data_constraints', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('key_variables', self.gf('jsonfield.fields.JSONField')(default={}, blank=True)),
            ('training_set', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('test_set', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('accuracy', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('tpr', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('tt', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('roc', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('model_score_range', self.gf('jsonfield.fields.JSONField')(default={}, blank=True)),
            ('template_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('variable_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('variable_key', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('geography_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('user_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('org_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, null=True, blank=True)),
            ('status', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('updated_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, null=True, blank=True)),
        ))
        db.send_create_signal('main', ['UserModel'])

        # Adding model 'ModelJob'
        db.create_table('model_modeljob', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user_model_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['main.UserModel'])),
            ('user_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('org_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('geography_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('status', self.gf('jsonfield.fields.JSONField')(default={}, blank=True)),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, null=True, blank=True)),
        ))
        db.send_create_signal('main', ['ModelJob'])

        # Adding model 'ModelMaster'
        db.create_table('model_modelmaster', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('model_key', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('model_name', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('description', self.gf('django.db.models.fields.CharField')(max_length=1000L, null=True, blank=True)),
            ('template_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, null=True, blank=True)),
            ('independent_variable', self.gf('django.db.models.fields.TextField')(null=True)),
            ('deployer_model_name', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('files_to_load', self.gf('django.db.models.fields.TextField')(null=True)),
            ('model_build_file', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('model_execute_file', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
        ))
        db.send_create_signal('main', ['ModelMaster'])


    def backwards(self, orm):
        # Deleting model 'UserModel'
        db.delete_table('model_usermodel')

        # Deleting model 'ModelJob'
        db.delete_table('model_modeljob')

        # Deleting model 'ModelMaster'
        db.delete_table('model_modelmaster')


    models = {
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'activation_key_send_date': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'client_created': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'client_key': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'client_secret': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'email_confirmed': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'first_login_date': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '75', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '75', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '75'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'main.country': {
            'Meta': {'object_name': 'Country', 'db_table': "'master_country'"},
            'country_a2_code': ('django.db.models.fields.CharField', [], {'max_length': '255L'}),
            'country_a3_code': ('django.db.models.fields.CharField', [], {'max_length': '255L'}),
            'country_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'country_name': ('django.db.models.fields.CharField', [], {'max_length': '255L'}),
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'main.customerdatasetupload': {
            'Meta': {'object_name': 'CustomerDatasetUpload', 'db_table': "'explore_plus_customerdataset'"},
            'author': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
            'category': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'file_format': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
            'file_name': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'file_path': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mytemplate_id': ('django.db.models.fields.IntegerField', [], {}),
            'org_id': ('django.db.models.fields.IntegerField', [], {}),
            'processed_insert_status': ('django.db.models.fields.CharField', [], {'max_length': '20L', 'null': 'True', 'blank': 'True'}),
            'processed_obj_id': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'processed_status': ('django.db.models.fields.CharField', [], {'max_length': '20L', 'null': 'True', 'blank': 'True'}),
            'rank_status': ('django.db.models.fields.CharField', [], {'max_length': '20L', 'null': 'True', 'blank': 'True'}),
            'raw_insert_status': ('django.db.models.fields.CharField', [], {'max_length': '20L', 'null': 'True', 'blank': 'True'}),
            'raw_obj_id': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'raw_status': ('django.db.models.fields.CharField', [], {'max_length': '20L', 'null': 'True', 'blank': 'True'}),
            'region': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'status': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'uploaded_date': ('django.db.models.fields.CharField', [], {'max_length': '10L', 'null': 'True', 'blank': 'True'}),
            'user_id': ('django.db.models.fields.IntegerField', [], {})
        },
        'main.dataset': {
            'Meta': {'object_name': 'Dataset', 'db_table': "'subscription_dataset'"},
            'ds_country_code': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'ds_created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'ds_desc': ('django.db.models.fields.CharField', [], {'max_length': '5000L', 'null': 'True', 'blank': 'True'}),
            'ds_license': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'ds_name': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'ds_owner': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'ds_published_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'null': 'True', 'blank': 'True'}),
            'ds_state_code': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'ds_type': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'ds_variables': ('django.db.models.fields.CharField', [], {'max_length': '5000L', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'main.jobconfigure': {
            'Meta': {'object_name': 'JobConfigure', 'db_table': "'explore_plus_jobconfigure'"},
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'job_id': ('django.db.models.fields.CommaSeparatedIntegerField', [], {'max_length': '200'}),
            'template_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'variable_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'})
        },
        'main.jobexecution': {
            'Meta': {'object_name': 'JobExecution', 'db_table': "'explore_plus_jobexecution'"},
            'doc_id': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'end_time': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'null': 'True', 'blank': 'True'}),
            'execution_status': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'job_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'jobconfigure_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'start_time': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'})
        },
        'main.jobmaster': {
            'Meta': {'object_name': 'JobMaster', 'db_table': "'explore_plus_jobmaster'"},
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'jobtitle': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'})
        },
        'main.keystable': {
            'Meta': {'object_name': 'KeysTable', 'db_table': "'subscription_keys'"},
            'category': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'null': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '2000L', 'null': 'True', 'blank': 'True'}),
            'ds_type': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'formula': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'index_id': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'keys': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'source': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'source_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'null': 'True', 'blank': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'unit': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'})
        },
        'main.modeljob': {
            'Meta': {'object_name': 'ModelJob', 'db_table': "'model_modeljob'"},
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'org_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'status': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'user_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'user_model_id': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['main.UserModel']"})
        },
        'main.modelmaster': {
            'Meta': {'object_name': 'ModelMaster', 'db_table': "'model_modelmaster'"},
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'null': 'True', 'blank': 'True'}),
            'deployer_model_name': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1000L', 'null': 'True', 'blank': 'True'}),
            'files_to_load': ('django.db.models.fields.TextField', [], {'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'independent_variable': ('django.db.models.fields.TextField', [], {'null': 'True'}),
            'model_build_file': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'model_execute_file': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'model_key': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'model_name': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'template_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'})
        },
        'main.mybuild': {
            'Meta': {'object_name': 'MyBuild', 'db_table': "'mysphere_mybuild'"},
            'build_conf': ('django.db.models.fields.CharField', [], {'max_length': '5000L'}),
            'build_name': ('django.db.models.fields.CharField', [], {'max_length': '255L'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'main.mysphere': {
            'Meta': {'object_name': 'MySphere', 'db_table': "'mysphere_mysphere'"},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mybuild_id': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['main.MyBuild']"}),
            'saved_images_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'saved_list_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'user_id': ('django.db.models.fields.IntegerField', [], {})
        },
        'main.mysphere_model': {
            'Meta': {'object_name': 'mysphere_model', 'db_table': "'mysphere_model'"},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'model_name': ('django.db.models.fields.CharField', [], {'max_length': '255L'}),
            'model_type': ('django.db.models.fields.CharField', [], {'max_length': '255L'})
        },
        'main.mytemplate': {
            'Meta': {'object_name': 'MyTemplate', 'db_table': "'explore_plus_mytemplate'"},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'levels_mapping': ('jsonfield.fields.JSONField', [], {'default': '{}', 'blank': 'True'}),
            'minmax': ('jsonfield.fields.JSONField', [], {'default': '{}', 'blank': 'True'}),
            'mytemplate_name': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'org_id': ('django.db.models.fields.IntegerField', [], {}),
            'template': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['main.Template']", 'null': 'True', 'blank': 'True'}),
            'template_json': ('jsonfield.fields.JSONField', [], {'default': '{}', 'blank': 'True'}),
            'template_path': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'})
        },
        'main.order': {
            'Meta': {'object_name': 'order', 'db_table': "'order'"},
            'address': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
            'company_name': ('django.db.models.fields.CharField', [], {'max_length': '100L', 'null': 'True', 'blank': 'True'}),
            'fulfillment': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'order_id': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
            'org_id': ('django.db.models.fields.IntegerField', [], {}),
            'payment_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'payment_location': ('django.db.models.fields.CharField', [], {'max_length': '100L', 'null': 'True', 'blank': 'True'}),
            'payment_mode': ('django.db.models.fields.CharField', [], {'max_length': '100L', 'null': 'True', 'blank': 'True'}),
            'payment_provider': ('django.db.models.fields.CharField', [], {'max_length': '100L', 'null': 'True', 'blank': 'True'}),
            'payment_status': ('django.db.models.fields.CharField', [], {'max_length': '50L', 'null': 'True', 'blank': 'True'}),
            'payment_transaction_id': ('django.db.models.fields.CharField', [], {'max_length': '50L', 'null': 'True', 'blank': 'True'}),
            'subcription_id': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
            'user_id': ('django.db.models.fields.IntegerField', [], {})
        },
        'main.pricing': {
            'Meta': {'object_name': 'Pricing', 'db_table': "'subscription_pricing'"},
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'currency': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'dataset_id': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['main.Dataset']", 'null': 'True', 'blank': 'True'}),
            'effective_till_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'label': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'operation': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'})
        },
        'main.savedlists': {
            'Meta': {'object_name': 'SavedLists', 'db_table': "'mysphere_saved_lists'"},
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'list_data_url': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'list_desc': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'list_name': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'user_id': ('django.db.models.fields.IntegerField', [], {})
        },
        'main.subdivision': {
            'Meta': {'object_name': 'SubDivision', 'db_table': "'master_subdivision'"},
            'country_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'level': ('django.db.models.fields.CharField', [], {'max_length': '255L'}),
            'subdivision_code': ('django.db.models.fields.CharField', [], {'max_length': '255L'}),
            'subdivision_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'subdivision_name': ('django.db.models.fields.CharField', [], {'max_length': '255L'})
        },
        'main.subscription': {
            'Meta': {'object_name': 'Subscription', 'db_table': "'subscription_subscription'"},
            'dataset_id': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['main.Dataset']", 'null': 'True', 'blank': 'True'}),
            'end_date': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'order_id': ('django.db.models.fields.CharField', [], {'max_length': '50L', 'null': 'True', 'blank': 'True'}),
            'org_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'start_date': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'}),
            'sub_type': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'user_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'})
        },
        'main.template': {
            'Meta': {'object_name': 'Template', 'db_table': "'explore_plus_template'"},
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
            'format': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'sector': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'})
        },
        'main.tokenstoragemodel': {
            'Meta': {'object_name': 'TokenStorageModel'},
            'id': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'google_id'", 'primary_key': 'True', 'to': u"orm['auth.User']"}),
            'token': ('django.db.models.fields.TextField', [], {})
        },
        'main.unit': {
            'Meta': {'object_name': 'Unit', 'db_table': "'explore_plus_unit'"},
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'})
        },
        'main.uploadlog': {
            'Meta': {'object_name': 'UploadLog', 'db_table': "'explore_plus_uploadlog'"},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'log_json': ('jsonfield.fields.JSONField', [], {'default': '{}', 'blank': 'True'}),
            'mytemplate_id': ('django.db.models.fields.IntegerField', [], {}),
            'status': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'uploaded_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'user_id': ('django.db.models.fields.IntegerField', [], {})
        },
        'main.usermodel': {
            'Meta': {'object_name': 'UserModel', 'db_table': "'model_usermodel'"},
            'accuracy': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'null': 'True', 'blank': 'True'}),
            'data_constraints': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'null': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1000L', 'null': 'True', 'blank': 'True'}),
            'geography_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'key_variables': ('jsonfield.fields.JSONField', [], {'default': '{}', 'blank': 'True'}),
            'model_id': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['main.ModelMaster']"}),
            'model_score_key': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'model_score_name': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'model_score_range': ('jsonfield.fields.JSONField', [], {'default': '{}', 'blank': 'True'}),
            'org_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'roc': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'template_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'test_set': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'tpr': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'training_set': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'tt': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'user_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'variable_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'variable_key': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'version': ('django.db.models.fields.CharField', [], {'max_length': '10L', 'null': 'True', 'blank': 'True'})
        },
        'main.userprofile': {
            'Meta': {'object_name': 'UserProfile'},
            'company': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'country': ('django.db.models.fields.CharField', [], {'max_length': '2', 'null': 'True', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'industry': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'is_individual': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'job_title': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'state': ('django.db.models.fields.CharField', [], {'max_length': '2', 'null': 'True', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'related_name': "'profile'", 'unique': 'True', 'to': u"orm['auth.User']"}),
            'username': ('django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'})
        },
        'main.variable': {
            'Meta': {'object_name': 'Variable', 'db_table': "'explore_plus_variable'"},
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'datatype': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'datatype1': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '5000L', 'null': 'True', 'blank': 'True'}),
            'formula': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
            'formula_id': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'formula_steps': ('django.db.models.fields.CharField', [], {'max_length': '10L', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'source': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
            'templates': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['main.Template']", 'symmetrical': 'False'}),
            'unit_id': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'variable_key': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'variabletype': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'})
        },
        'main.variableproduct': {
            'Meta': {'object_name': 'VariableProduct', 'db_table': "'explore_plus_variableproduct'"},
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'template_id': ('django.db.models.fields.IntegerField', [], {}),
            'variable_id': ('django.db.models.fields.IntegerField', [], {})
        }
    }

    complete_apps = ['main']
