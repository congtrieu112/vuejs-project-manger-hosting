<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Mails
        <small>advanced tables</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#">
            <i class="fa fa-dashboard"></i> Home
          </a>
        </li>
        <li>
          <a href="#">Mails</a>
        </li>
        <li class="active">Mails</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Mails</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
               <form id="add-or-update-form" role="form" autocomplete="off">
            <!-- to: req.body.to,//'ittrjeu@gmail.com',
            subject: req.body.subject,//'Test Nodemailer',
            // text: 'You recieved message from ' ,
            html: req.body.html// -->
                    <div class="form-group">
                        <label for="to">To</label>
                        <input
                        type="email"
                        name="to"
                        class="form-control"
                        placeholder="admin@sanphamweb.com"
                        required="required"
                        />
                    </div>
                    <div class="form-group">
                        <label for="subject">subject</label>
                        <input
                        type="text"
                        name="subject"
                        class="form-control"
                        placeholder="Send Test Email"
                        required="required"
                        />
                    </div>
                    

                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea
                        name="description"
                        class="form-control"
                        required="required"
                        ></textarea>
                    </div>

                   
                   
                <button type="submit" class="btn btn-primary">Send</button>
                </form>
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
    
  </div>
</template>
<script>
import axios from "axios";
// import $ from "jquery";
import { API } from "@/const/constants";
import Services from "@/api";
import Swal from "sweetalert2";
export default {
  data: function() {
    return {
      error:true
    };
  },
  methods: {
    async loadData() {
      const data = await axios.get(API.HOST + "/send-mails");
      console.log("data", data.data);
    },
    handleSubmit: async function(e) {
      // this.$refs.form.submit()
      console.log("this.error",e);
      if (e.detail.error===false) {
        const form = $("#add-or-update-form");
        let dataValue = form.serialize();
        const button = form.find("button[type=submit]").button("loading");
        const result = await Services.createOrApi(dataValue, "send-mails");
        button.button("reset");
        if (result.data.errno) {
          Swal.fire(result.data.message, "", "error");
        } else {
          Swal.fire("Send mail success", "", "success").then(result => {
              form[0].reset();
          });
        }
      }

      return false;
    }
  },
  mounted() {
    document.addEventListener('click', this.handleSubmit);
    // CKEDITOR.replace('description');
    // CKEDITOR.editorConfig = function( config ) {
    //     config.toolbarGroups =  [
    //             { name: 'document',	   groups: [ 'mode', 'document' ] },			// Displays document group with its two subgroups.
    //             { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },			// Group's name will be used to create voice label.
    //             '/',																// Line break - next group will be placed in new line.
    //             { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    //             { name: 'links' }
    //         ];
    // };
    $("#add-or-update-form").bootstrapValidator({
         live: 'enabled',
        fields: {
          to: {
            validators: {
              notEmpty: {
                message: "please input email"
              },
              emailAddress: {
                message: "email not correct format"
              }
            }
          },
          subject: {
            validators: {
              notEmpty: {
                message: "please input subject"
              }
            }
          },
          description: {
            validators: {
              notEmpty: {
                message: "please input content"
              },
              callback: {
                    message: 'The bio must be less than 200 characters long',
                    callback: function(value, validator, $field) {
                        // Get the plain text without HTML
                        var div  = $('<div/>').html(value).get(0),
                            text = div.textContent || div.innerText;

                        return text.length <= 200;
                    }
                }
            }
          },
          
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
      }).find('[name="description"]')
            .ckeditor()
            .editor
                // To use the 'change' event, use CKEditor 4.2 or later
                .on('change', function() {
                    // Revalidate the bio field
                    $('#add-or-update-form').bootstrapValidator('revalidateField', 'description');
                });
    

  }
};
</script>
<style scoped>
.ml-20 {
  margin-left: 20px;
}
</style>
