<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Create client
        <small>Preview</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/clients">
            <i class="fa fa-dashboard"></i> Home
          </a>
        </li>
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
            <form @submit.prevent="handleSubmit" id="create-client">
              <div class="box-body">
                <div class="form-group">
                  <label for="textfullname">Full Name Client</label>
                  <input
                    type="text"
                    name="fullname"
                    class="form-control"
                    id="textfullname"
                    placeholder="Dinh Cong Trieu"
                    required="required"
                  />
                </div>
                <div class="form-group">
                  <label for="textemail">Email</label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    id="textemail"
                    placeholder="congtrieu@gmail.com"
                    required="required"
                  />
                </div>
                <div class="form-group">
                  <label for="textphone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    id="textphone"
                    class="form-control"
                    placeholder="0797409692"
                    required="required"
                  />
                </div>
                <div class="form-group">
                  <label for="textdescription">Description</label>
                  <textarea
                    name="description"
                    id="textdescription"
                    class="form-control"
                    placeholder="Contend"
                    required="required"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="textpassword">Password</label>
                  <input
                    type="password"
                    id="textpassword"
                    class="form-control"
                    name="password"
                    required="required"
                  />
                </div>
                <div class="form-group">
                  <label for="textrepassword">Re Password</label>
                  <input
                    type="password"
                    id="textrepassword"
                    class="form-control"
                    name="repassword"
                    required="required"
                  />
                </div>
                <div class="form-group">
                  <label for="textstatus">Status</label>
                  <select
                    id="textstatus"
                    class="form-control select2"
                    name="status"
                    required="required"
                  >
                    <option value="1">Active</option>
                    <option value="0">Deactive</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="textbirthday">Birthday</label>
                  <input
                    type="text"
                    id="textbirthday"
                    class="form-control"
                    name="birthday"
                    required="required"
                  />
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
import Services from "@/api";
import Swal from "sweetalert2";
export default {
  methods: {
    handleSubmit: async function(e) {
      // this.$refs.form.submit()
      let dataValue = $("#create-client").serialize();
      const button = $("#create-client")
        .find("button[type=submit]")
        .button("loading");
      console.log("formData", dataValue);
      const result = await Services.createClient(dataValue);
      button.button("reset");
      if (result.data.errno) {
        alert(result.data.message);
      } else {
        Swal.fire("Create success", "", "success").then(result => {
          $("#create-client")[0].reset();
        });
      }
      console.log("result", result);
      return false;
    }
  },
  mounted() {
    //Date picker
    $("#textbirthday").datepicker({
      autoclose: true
    });
    //Initialize Select2 Elements
    $(".select2").select2();
  }
};
</script>
