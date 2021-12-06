# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Adding model 'JobExecution'
        db.create_table('explore_plus_jobexecution', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('doc_id', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('jobconfigure_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('job_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('start_time', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('end_time', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True,null=True)),
            ('execution_status', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
        ))
        db.send_create_signal('main', ['JobExecution'])

        # Adding model 'VariableProduct'
        db.create_table('explore_plus_variableproduct', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('variable_id', self.gf('django.db.models.fields.IntegerField')()),
            ('template_id', self.gf('django.db.models.fields.IntegerField')()),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal('main', ['VariableProduct'])

        # Adding model 'Variable'
        db.create_table('explore_plus_variable', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('description', self.gf('django.db.models.fields.CharField')(max_length=5000L, null=True, blank=True)),
            ('formula', self.gf('django.db.models.fields.CharField')(max_length=500L, null=True, blank=True)),
            ('source', self.gf('django.db.models.fields.CharField')(max_length=500L, null=True, blank=True)),
            ('unit_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('variabletype', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('datatype', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('datatype1', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('formula_id', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('variable_key', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('formula_steps', self.gf('django.db.models.fields.CharField')(max_length=10L, null=True, blank=True)),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal('main', ['Variable'])

        # Adding M2M table for field templates on 'Variable'
        m2m_table_name = db.shorten_name('explore_plus_variable_templates')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('variable', models.ForeignKey(orm['main.variable'], null=False)),
            ('template', models.ForeignKey(orm['main.template'], null=False))
        ))
        db.create_unique(m2m_table_name, ['variable_id', 'template_id'])

        # Adding model 'Template'
        db.create_table('explore_plus_template', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('description', self.gf('django.db.models.fields.CharField')(max_length=500L, null=True, blank=True)),
            ('sector', self.gf('django.db.models.fields.CharField')(max_length=500L, null=True, blank=True)),
            ('format', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal('main', ['Template'])

        # Adding model 'mysphere_model'
        db.create_table('mysphere_model', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('model_name', self.gf('django.db.models.fields.CharField')(max_length=255L)),
            ('model_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('model_type', self.gf('django.db.models.fields.CharField')(max_length=255L)),
        ))
        db.send_create_signal('main', ['mysphere_model'])

        # Adding model 'SavedLists'
        db.create_table('mysphere_saved_lists', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('list_name', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('list_desc', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('list_data_url', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('user_id', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal('main', ['SavedLists'])

        # Adding model 'Pricing'
        db.create_table('subscription_pricing', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('effective_till_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, null=True, blank=True)),
            ('dataset_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['main.Dataset'], null=True, blank=True)),
            ('label', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('operation', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('type', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('currency', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
        ))
        db.send_create_signal('main', ['Pricing'])

        # Adding model 'MyTemplate'
        db.create_table('explore_plus_mytemplate', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('template', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['main.Template'], null=True, blank=True)),
            ('template_json', self.gf('jsonfield.fields.JSONField')(default={}, blank=True)),
 	    ('minmax', self.gf('jsonfield.fields.JSONField')(default={}, blank=True)),
            ('levels_mapping', self.gf('jsonfield.fields.JSONField')(default={}, blank=True)),
            ('template_path', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('org_id', self.gf('django.db.models.fields.IntegerField')()),
            ('mytemplate_name', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
        ))
        db.send_create_signal('main', ['MyTemplate'])

        # Adding model 'CustomerDatasetUpload'
        db.create_table('explore_plus_customerdataset', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user_id', self.gf('django.db.models.fields.IntegerField')()),
            ('org_id', self.gf('django.db.models.fields.IntegerField')()),
            ('mytemplate_id', self.gf('django.db.models.fields.IntegerField')()),
            ('file_name', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('file_format', self.gf('django.db.models.fields.CharField')(max_length=500L, null=True, blank=True)),
            ('file_path', self.gf('django.db.models.fields.CharField')(max_length=500L, null=True, blank=True)),
            ('author', self.gf('django.db.models.fields.CharField')(max_length=500L, null=True, blank=True)),
            ('status', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('region', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('raw_obj_id', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('processed_obj_id', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('category', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('uploaded_date', self.gf('django.db.models.fields.CharField')(max_length=10L, null=True, blank=True)),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('raw_insert_status', self.gf('django.db.models.fields.CharField')(max_length=20L, null=True, blank=True)),
            ('processed_insert_status', self.gf('django.db.models.fields.CharField')(max_length=20L, null=True, blank=True)),
            ('raw_status', self.gf('django.db.models.fields.CharField')(max_length=20L, null=True, blank=True)),
            ('processed_status', self.gf('django.db.models.fields.CharField')(max_length=20L, null=True, blank=True)),
            ('rank_status', self.gf('django.db.models.fields.CharField')(max_length=20L, null=True, blank=True)),
        ))
        db.send_create_signal('main', ['CustomerDatasetUpload'])

        # Adding model 'order'
        db.create_table('order', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('order_id', self.gf('django.db.models.fields.CharField')(max_length=500L, null=True, blank=True)),
            ('subcription_id', self.gf('django.db.models.fields.CharField')(max_length=500L, null=True, blank=True)),
            ('user_id', self.gf('django.db.models.fields.IntegerField')()),
            ('org_id', self.gf('django.db.models.fields.IntegerField')()),
            ('payment_mode', self.gf('django.db.models.fields.CharField')(max_length=100L, null=True, blank=True)),
            ('payment_transaction_id', self.gf('django.db.models.fields.CharField')(max_length=50L, null=True, blank=True)),
            ('payment_status', self.gf('django.db.models.fields.CharField')(max_length=50L, null=True, blank=True)),
            ('address', self.gf('django.db.models.fields.CharField')(max_length=500L, null=True, blank=True)),
            ('company_name', self.gf('django.db.models.fields.CharField')(max_length=100L, null=True, blank=True)),
            ('payment_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('payment_location', self.gf('django.db.models.fields.CharField')(max_length=100L, null=True, blank=True)),
            ('payment_provider', self.gf('django.db.models.fields.CharField')(max_length=100L, null=True, blank=True)),
            ('fulfillment', self.gf('django.db.models.fields.BooleanField')(default=False)),
        ))
        db.send_create_signal('main', ['order'])

        # Adding model 'Country'
        db.create_table('master_country', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('country_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('country_a2_code', self.gf('django.db.models.fields.CharField')(max_length=255L)),
            ('country_a3_code', self.gf('django.db.models.fields.CharField')(max_length=255L)),
            ('country_name', self.gf('django.db.models.fields.CharField')(max_length=255L)),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal('main', ['Country'])

        # Adding model 'SubDivision'
        db.create_table('master_subdivision', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('country_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('subdivision_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('subdivision_code', self.gf('django.db.models.fields.CharField')(max_length=255L)),
            ('subdivision_name', self.gf('django.db.models.fields.CharField')(max_length=255L)),
            ('level', self.gf('django.db.models.fields.CharField')(max_length=255L)),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal('main', ['SubDivision'])

        # Adding model 'MySphere'
        db.create_table('mysphere_mysphere', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user_id', self.gf('django.db.models.fields.IntegerField')()),
            ('mybuild_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['main.MyBuild'])),
            ('saved_list_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('saved_images_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
        ))
        db.send_create_signal('main', ['MySphere'])

        # Adding model 'Dataset'
        db.create_table('subscription_dataset', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('ds_country_code', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('ds_state_code', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('ds_name', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('ds_owner', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('ds_variables', self.gf('django.db.models.fields.CharField')(max_length=5000L, null=True, blank=True)),
            ('ds_desc', self.gf('django.db.models.fields.CharField')(max_length=5000L, null=True, blank=True)),
            ('ds_created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('ds_license', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('ds_published_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, null=True, blank=True)),
            ('ds_type', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
        ))
        db.send_create_signal('main', ['Dataset'])

        # Adding model 'Unit'
        db.create_table('explore_plus_unit', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal('main', ['Unit'])

        # Adding model 'Subscription'
        db.create_table('subscription_subscription', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('start_date', self.gf('django.db.models.fields.DateTimeField')(null=True, blank=True)),
            ('end_date', self.gf('django.db.models.fields.DateTimeField')(null=True, blank=True)),
            ('user_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('dataset_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['main.Dataset'], null=True, blank=True)),
            ('sub_type', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('order_id', self.gf('django.db.models.fields.CharField')(max_length=50L, null=True, blank=True)),
            ('org_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
        ))
        db.send_create_signal('main', ['Subscription'])

        # Adding model 'MyBuild'
        db.create_table('mysphere_mybuild', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('build_name', self.gf('django.db.models.fields.CharField')(max_length=255L)),
            ('build_conf', self.gf('django.db.models.fields.CharField')(max_length=5000L)),
        ))
        db.send_create_signal('main', ['MyBuild'])

        # Adding model 'JobMaster'
        db.create_table('explore_plus_jobmaster', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('jobtitle', self.gf('django.db.models.fields.CharField')(max_length=255L, null=True, blank=True)),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal('main', ['JobMaster'])

        # Adding model 'JobConfigure'
        db.create_table('explore_plus_jobconfigure', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('template_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('variable_id', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('job_id', self.gf('django.db.models.fields.CommaSeparatedIntegerField')(max_length=200)),
            ('created_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal('main', ['JobConfigure'])


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
            'file_format': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
            'file_name': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'file_path': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mytemplate_id': ('django.db.models.fields.IntegerField', [], {}),
            'org_id': ('django.db.models.fields.IntegerField', [], {}),
            'region': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'status': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'raw_obj_id': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'processed_obj_id': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'category': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
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
            'end_time': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
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
        'main.mybuild': {
            'Meta': {'object_name': 'MyBuild', 'db_table': "'mysphere_mybuild'"},
            'build_conf': ('django.db.models.fields.CharField', [], {'max_length': '255L'}),
            'build_name': ('django.db.models.fields.CharField', [], {'max_length': '255L'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'main.mysphere': {
            'Meta': {'object_name': 'MySphere', 'db_table': "'mysphere_mysphere'"},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mybuild_id': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['main.MyBuild']"}),
            'saved_images_id': ('django.db.models.fields.IntegerField', [], {}),
            'saved_list_id': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['main.SavedLists']"}),
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
            'list_data_url': ('django.db.models.fields.CharField', [], {'max_length': '255L'}),
            'list_desc': ('django.db.models.fields.CharField', [], {'max_length': '255L'}),
            'list_name': ('django.db.models.fields.CharField', [], {'max_length': '255L'})
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
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255L', 'null': 'True', 'blank': 'True'}),
            'source': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
            'templates': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['main.Template']", 'symmetrical': 'False'}),
            'units': ('django.db.models.fields.CharField', [], {'max_length': '500L', 'null': 'True', 'blank': 'True'}),
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
