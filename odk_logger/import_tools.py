# encoding=utf-8
import glob
import os
import shutil
import tempfile
import zipfile

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.utils.translation import ugettext as _

from utils.logger_tools import create_instance
from odk_logger.xform_fs import XFormInstanceFS

# odk
# ├── forms
# │   ├── Agriculture_2011_03_18.xml
# │   ├── Education_2011_03_18.xml
# │   ├── Health_2011_03_18.xml
# │   ├── LGA_2011_03_18.xml
# │   ├── Registration_2011_03_18.xml
# │   └── Water_2011_03_18.xml
# ├── instances
# │   ├── Education_2011_03_18_2011-03-23_11-07-36
# │   │   ├── 1300878537573.jpg
# │   │   └── Education_2011_03_18_2011-03-23_11-07-36.xml
# │   ├── Registration_2011_03_18_2011-03-21_19-33-34
# │   │   └── Registration_2011_03_18_2011-03-21_19-33-34.xml
# └── metadata
#     └── data


def django_file(path, field_name, content_type):
    # adapted from here:
    # http://groups.google.com/group/django-users/browse_thread/thread/834f988876ff3c45/
    f = open(path)
    print("** django_file **")
    #print(f)
    return InMemoryUploadedFile(
        file=f,
        field_name=field_name,
        name=f.name,
        content_type=content_type,
        size=os.path.getsize(path),
        charset=None
    )


def import_instance(path_to_instance_folder, status, user):
    xml_files = glob.glob(os.path.join(path_to_instance_folder, "*.xml"))
    if len(xml_files) < 1:
        return
    if len(xml_files) > 1:
        raise Exception(_("Too many XML files."))
    xml_file = django_file(xml_files[0],
                           field_name="xml_file",
                           content_type="text/xml")
    images = []
    for jpg in glob.glob(os.path.join(path_to_instance_folder, "*.jpg")):
        image_file = django_file(jpg,
                                 field_name="image",
                                 content_type="image/jpeg")
        images.append(image_file)
    # todo: if an instance has been submitted make sure all the
    # files are in the database.
    # there shouldn't be any instances with a submitted status in the
    instance = create_instance(user.username, xml_file, images, status)
    # close the files
    xml_file.close()
    for i in images:
        i.close()
    return instance


def iterate_through_odk_instances(dirpath, callback):
    print("** iterate_through_odk_instances 3 **")
    #print(dirpath)
    total_file_count = 0
    success_count = 0
    errors = []
    for directory, subdirs, subfiles in os.walk(dirpath):
        for filename in subfiles:
            filepath = os.path.join(directory, filename)
            #print(filepath)
            if XFormInstanceFS.is_valid_odk_instance(filepath):
                print("*********")
                xfxs = XFormInstanceFS(filepath)
                #print(filepath)
                try:
                    success_count += callback(xfxs)
                except Exception, e:
                    errors.append("%s => %s" % (xfxs.filename, str(e)))
                del(xfxs)
                total_file_count += 1
    return (total_file_count, success_count, errors)


def import_instances_from_zip(zipfile_path, user, status="zip"):
    print("** zipfile_path 1 **")
    #print(zipfile_path)
    count = 0
    try:
        temp_directory = tempfile.mkdtemp()
        zf = zipfile.ZipFile(zipfile_path)
 	print("** temp_directory **")
        #print(temp_directory)
        zf.extractall(temp_directory)
    except zipfile.BadZipfile, e:
        errors = [u"%s" % e]
        return 0, 0, errors
    else:
        return import_instances_from_path(temp_directory, user, status)
    finally:
        shutil.rmtree(temp_directory) 

def import_instances_from_path(path, user, status="zip"):
    print("** import_instances_from_path 2 **")
    #print(path)
    count = 0
    def callback(xform_fs):
        """
        This callback is passed an instance of a XFormInstanceFS.
        See xform_fs.py for more info.
        """
        xml_file = django_file(xform_fs.path,
            field_name="xml_file",
            content_type="text/xml")
        images = [django_file(jpg, field_name="image",
            content_type="image/jpeg") for jpg in xform_fs.photos]
        # TODO: if an instance has been submitted make sure all the
        # files are in the database.
        # there shouldn't be any instances with a submitted status in the
        instance = create_instance(user.username, xml_file, images, status)
        # close the files
        xml_file.close()
        for i in images:
            i.close()
        if instance:
            return 1
        else:
            return 0
    total_count, success_count, errors = iterate_through_odk_instances(
        path, callback)
    return (total_count, success_count, errors)
