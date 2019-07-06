<template>
    <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Create client
        <small>Preview</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="/clients"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Create Client</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <!-- general form elements -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">Quick Example</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form role="form">
              <div class="box-body">
                <div class="form-group">
                  <label for="textname">Name Client</label>
                  <input type="text" name="name" class="form-control" id="textname" placeholder="Enter name">
                </div>
                <div class="form-group">
                  <label for="textdateRegister">Date Created</label>
                  <input type="text" name="dateRegister" class="form-control" id="textdateRegister" placeholder="20-01-2019">
                </div>
                <div class="form-group">
                  <label for="textdateExpires">Date Exprires</label>
                  <input type="text" name="dateExpires" id="textdateExpires" class="form-control" placeholder="20-01-2019">
                </div>
                <div class="form-group">
                  <label for="textdescription">Description</label>
                  <textarea name="description" id="textdescription"  class="form-control" placeholder="Contend"></textarea>
                </div>
                <div class="form-group">
                  <label for="textstatus">Status</label>
                  <select id="textstatus" class="form-control select2" name="status" style="with:100%" >
                      <option value="0">Active</option>
                      <option value="1">Disable</option>
                  </select>
                </div>
                
              </div>
              <!-- /.box-body -->

              <div class="box-footer">
                <button type="submit" class="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
          <!-- /.box -->

        </div>
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
export default {
    mounted(){
        //Date picker
        $('#textdateRegister,#textdateExpires').datepicker({
        autoclose: true
        })
        //Initialize Select2 Elements
        $('.select2').select2()

    }
}
</script>
