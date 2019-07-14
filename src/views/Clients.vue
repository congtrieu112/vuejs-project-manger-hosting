<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Clients
        <small>advanced tables</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#">
            <i class="fa fa-dashboard"></i> Home
          </a>
        </li>
        <li>
          <a href="#">Tables</a>
        </li>
        <li class="active">Clients</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Clients</h3>
              <button class="btn btn-success btn-sm btn-add-item ml-20">Add New</button>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>fullname</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>description</th>
                    <th>birday</th>
                    <th>status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
                <tfoot>
                  <tr>
                    <th>fullname</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>description</th>
                    <th>birday</th>
                    <th>status</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
    <!-- MODAL EDIT USER -->
    <div class="modal fade" id="model-edit-or-add-data">
      <div class="modal-dialog">
        <div class="modal-content">
          <form id="add-or-update-form" role="form" autocomplete="off">
            <div class="modal-header">
              <button
                type="button"
                class="close close-modal-btn"
                data-dismiss="modal"
                aria-hidden="true"
              >&times;</button>
              <h4 class="modal-title">Clients</h4>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="fullname">Name</label>
                <input
                  type="text"
                  name="fullname"
                  class="form-control"
                  placeholder="fullname"
                  required="required"
                />
              </div>
              <div class="form-group">
                <label for="email">email</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="email"
                  required="required"
                />
              </div>
              <div class="form-group">
                <label for="phone">phone</label>
                <input
                  type="text"
                  name="phone"
                  class="form-control"
                  placeholder="phone"
                  required="required"
                />
              </div>
              <div class="form-group">
                <label for="textbirday">birthday</label>
                <input
                  type="text"
                  name="birthday"
                  id="textbirday"
                  class="form-control"
                  placeholder="birthday"
                  required="required"
                />
              </div>

              <div class="form-group">
                <label for="description">Description</label>
                <textarea
                  name="description"
                  class="form-control"
                  placeholder="content"
                  required="required"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="status">Status</label>
                <select name="status" class="form-control select2" required="required">
                  <option value="1">Active</option>
                  <option value="2">Disable</option>
                </select>
              </div>
              <input type="hidden" name="id" />
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
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default close-modal-btn"
                data-dismiss="modal"
              >Close</button>
              <button type="submit" class="btn btn-primary">Save or create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import $ from "jquery";
import { API } from "@/const/constants";
import Services from "@/api";
import Swal from "sweetalert2";
import moment from "moment";
export default {
  data: function() {
    return {
      table: "",
      modalEl: "",
      error:true
    };
  },
  methods: {
    async loadData() {
      const data = await axios.get(API.HOST + "/clients");
      console.log("data", data.data);
    },
    onClick(e) {
      this.error = false;
      console.log("this.error",this.error);
      console.log("e",e);
    },
    handleSubmit: async function(e) {
      // this.$refs.form.submit()
      console.log("this.error",e);
      if (e.detail.error===false) {
        const form = $("#add-or-update-form");
        let dataValue = form.serialize() + "&username="+form.find("input[name=phone]").val();
        const button = form.find("button[type=submit]").button("loading");
        const result = await Services.createOrApi(dataValue, "clients");
        button.button("reset");
        if (result.data.errno) {
          Swal.fire(result.data.message, "", "error");
        } else {
          Swal.fire("Update or add success", "", "success").then(result => {
            this.table.ajax.reload(null, false);
            this.modalEl.modal("hide");
          });
        }
      }
      else if(e.detail.delete){
        const result = await Services.deleteApi({id:e.detail.delete}, "clients");
        if (typeof(result.data.errno) !== "undefined") {
          Swal.fire(result.data.message, "", "error");
        } else {
          Swal.fire("Delete success", "", "success").then(result => {
            this.table.ajax.reload(null, false);
            this.modalEl.modal("hide");
          });
        }
      }

      return false;
    }
  },
  mounted() {
    document.addEventListener('click', this.handleSubmit);
    this.table = $("#example1").DataTable({
      responsive: true,
      aLengthMenu: [
        [10, 20, 50, 100, 200, 1000000],
        [10, 20, 50, 100, 200, "All"]
      ],
      iDisplayLength: 10,
      processing: true,
      serverSide: true,
      stateSave: true,
      lengthChange: true,
      searching: false,
      paging: true,
      ajax: {
        url: `${API.HOST}/clients`,
        type: "GET",
        data: function(param) {
          const mappingColumnName = [
            "fullname",
            "email",
            "phone",
            "description",
            "birthday",
            "status"
          ];
          param.orderName = mappingColumnName[param.order[0].column];
          param.orderStatus = param.order[0].dir;
        },
        dataSrc: function(json) {
          return json.data;
        }
      },
      rowId: "id",
      columns: [
        { data: "fullname" },
        { data: "email" },
        { data: "phone" },
        { data: "description" },
        { data: "birthday" },
        { data: "status" }
      ],
        columnDefs: [
          {
            targets: 4,
            data: "birthday",
            render: function ( data, type, row, meta ) {
              const timeShow = moment(String(data)).format('DD/MM/YYYY');
              const timeInput = moment(String(data)).format('YYYY-MM-DD');
              const contentbirthday = `<div class="text-center mgt-4"  data-time="${timeInput}">
                                        <span class="alert alert-success">${timeShow}</span>
                                       </div>`;
              return contentbirthday;//(new Date(data)).toLocaleDateString("en-US");
            }
          },
          {
            targets: 5,
            data: "status",
            render: function ( data, type, row, meta ) {
              let classShow = '';
              let dataShow = '';
              switch(data){
                  case 1:
                    classShow = 'alert-success';
                    dataShow = 'Active';
                    break;
                  case 2:
                    classShow = 'alert-danger';
                    dataShow = 'Disable';
                    break;
              }
              const contentStatus = `<div class="text-center mgt-4" data-status="${data}">
                                        <span class="alert ${classShow}">${dataShow}</span>
                                       </div>`;
              return contentStatus;//(new Date(data)).toLocaleDateString("en-US");
            }
          },
          {
            targets: 6,
            data: null,
            defaultContent:
              '<a class="btn btn-warning btn-sm btn-edit-item">Edit</a> <a class="btn btn-danger btn-sm btn-delete">Delete</a>'
          }
        ]
    });
    this.modalEl = $("#model-edit-or-add-data");
    $("body").on("click", ".btn-edit-item", async function() {
      this.modalEl = $("#model-edit-or-add-data");
      this.modalEl.modal("show");
      const form = $("#add-or-update-form");
      const parentsTr = $(this).parents("tr");
      const serviceId = parentsTr.attr("id");
      const fullname = parentsTr.find("td").eq(0).text(),
            email = parentsTr.find("td").eq(1).text(),
            phone = parentsTr.find("td").eq(2).text(),
            description = parentsTr.find("td").eq(3).text(),
            birthday = parentsTr.find("td").eq(4).find("div").attr('data-time'),
            status = parentsTr.find("td").eq(5).find("div").attr('data-status');
      //Date picker
      form.find("input[name=birthday]").datepicker({ autoclose: true,format: 'yyyy-mm-dd'}).on('changeDate', function(e) {
            // Revalidate the date field
            $("#add-or-update-form").bootstrapValidator('revalidateField', 'birthday');
      });
      //Initialize Select2 Elements
      form.find(".select2").select2({ width: "100%" });
      this.modalEl.on("shown.bs.modal", function(e) {
        $("#add-or-update-form").bootstrapValidator("resetForm", true);
        form.find("input[name=fullname]").val(fullname);
        form.find("input[name=email]").val(email);
        form.find("input[name=phone]").val(phone);
        form.find("input[name=birthday]").datepicker('setDate', new Date(birthday));
        form.find("textarea[name=description]").val(description);
        form.find("select[name=status]").val(status);
        form.find("input[name=id]").val(serviceId);
        $("input[name=password]").val('');
        $("input[name=repassword]").val('');
        $("#add-or-update-form")
        .bootstrapValidator('enableFieldValidators', 'password', false)
        .bootstrapValidator('enableFieldValidators', 'repassword', false);
        
      });
      this.modalEl.on("hidden.bs.modal", function(e) {
          $("#add-or-update-form").data('bootstrapValidator').resetForm();
      });
      $("#add-or-update-form").bootstrapValidator({
         live: 'enabled',
        fields: {
          email: {
            validators: {
              notEmpty: {
                message: "please input email"
              },
              emailAddress: {
                message: "email not correct format"
              }
            }
          },
          fullname: {
            validators: {
              notEmpty: {
                message: "please input fullname"
              }
            }
          },
          phone: {
            validators: {
              notEmpty: {
                message: "please input phone"
              }
            }
          },
          description: {
            validators: {
              notEmpty: {
                message: "please input description"
              }
            }
          },
          birthday: {
            validators: {
              notEmpty: {
                message: "please input birthday"
              },
              date: {
                format: 'YYYY-MM-DD'
              }
            }
          },
          status: {
            validators: {
              notEmpty: {
                message: "please input status"
              }
            }
          },
          password: {
            enabled: false,
            validators: {
              notEmpty: {
                message: "please input status password"
              },
              stringLength: {
                min: 6,
                max: 50,
                message: "please input passs min 6 to max 50 character"
              }
            }
          },
          repassword: {
            enabled: false,
            validators: {
              notEmpty: {
                message: "please input repassword"
              },
              identical: {
                field: "password",
                message: "repassword does not match password"
              }
            }
          }
        },

        onSuccess:async function(e, data) {
          e.preventDefault();
          var event = new CustomEvent("click",{
            detail: {
              error:false
            }
          });
          document.dispatchEvent(event); 
          return false;
        }
      }).on('keyup', '[name="password"]', function() {
            var isEmpty = $(this).val() == '';
            $("#add-or-update-form")
                    .bootstrapValidator('enableFieldValidators', 'password', !isEmpty)
                    .bootstrapValidator('enableFieldValidators', 'repassword', !isEmpty);

            // Revalidate the field when user start typing in the password field
            if ($(this).val().length == 1) {
                $("#add-or-update-form").bootstrapValidator('validateField', 'password')
                                .bootstrapValidator('validateField', 'repassword');
            }
        });

    });
    $("body").on("click", ".btn-add-item", async function() {
      this.modalEl = $("#model-edit-or-add-data");
      this.modalEl.find("input[name=id]").val("");
      const form = $("#add-or-update-form");
      form[0].reset();
      this.modalEl.modal("show");
      //Date picker
      this.modalEl.find("input[name=birthday]").datepicker({ autoclose: true,format: 'yyyy-mm-dd'}).on('changeDate', function(e) {
            // Revalidate the date field
            $("#add-or-update-form").bootstrapValidator('revalidateField', 'birthday');
      });
      //Initialize Select2 Elements
      this.modalEl.find(".select2").select2({ width: "100%" });

      $("#add-or-update-form").bootstrapValidator({
         live: 'enabled',
        fields: {
          email: {
            validators: {
              notEmpty: {
                message: "please input email"
              },
              emailAddress: {
                message: "email not correct format"
              }
            }
          },
          fullname: {
            validators: {
              notEmpty: {
                message: "please input fullname"
              }
            }
          },
          phone: {
            validators: {
              notEmpty: {
                message: "please input phone"
              }
            }
          },
          description: {
            validators: {
              notEmpty: {
                message: "please input description"
              }
            }
          },
          birthday: {
            validators: {
              notEmpty: {
                message: "please input birthday"
              },
              date: {
                format: 'YYYY-MM-DD'
              }
            }
          },
          status: {
            validators: {
              notEmpty: {
                message: "please input status"
              }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: "please input status password"
              },
              stringLength: {
                min: 6,
                max: 50,
                message: "please input passs min 6 to max 50 character"
              }
            }
          },
          repassword: {
            validators: {
              notEmpty: {
                message: "please input repassword"
              },
              identical: {
                field: "password",
                message: "repassword does not match password"
              }
            }
          }
        },

        onSuccess:async function(e, data) {
          e.preventDefault();
          var event = new CustomEvent("click",{
            detail: {
              error:false
            }
          });
          document.dispatchEvent(event); 
          return false;
        }
      });
      this.modalEl.on("shown.bs.modal", function(e) {
        $("#add-or-update-form").bootstrapValidator("resetForm", true);
         $("#add-or-update-form")
        .bootstrapValidator('enableFieldValidators', 'password', true)
        .bootstrapValidator('enableFieldValidators', 'repassword', true);
        form.find("input[name=id]").val('');
      });
      this.modalEl.on("hidden.bs.modal", function(e) {
          $("#add-or-update-form").data('bootstrapValidator').resetForm();
      });
      
    });
    $("body").on("click", ".btn-delete", async function() {
      const parentsTr = $(this).parents("tr");
      const serviceId = parentsTr.attr("id");
      var event = new CustomEvent("click", {
            detail: {
              delete: serviceId
            }
          });
      document.dispatchEvent(event);
      return false;
    })
  }
};
</script>
<style scoped>
.ml-20 {
  margin-left: 20px;
}
</style>
