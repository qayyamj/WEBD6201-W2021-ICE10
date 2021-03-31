
namespace core
{
  
    
    function testFullName(): void
    {
      let messageArea = $("#messageArea").hide();
      let fullNamePattern = /([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*/;

        
        $("#fullName").on("blur", function()
        {
          if(!fullNamePattern.test($(this).val().toString()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Full Name. This must include at least a Capitalized first name followed by a Capitlalized last name.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testContactNumber(): void
    {
      let messageArea = $("#messageArea");
      let contactNumberPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        
        $("#contactNumber").on("blur", function()
        {
          if(!contactNumberPattern.test($(this).val().toString()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Contact Number. Country code and area code are both optional");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testEmailAddress():void
    {
      let messageArea = $("#messageArea");
      let emailAddressPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
        
        $("#emailAddress").on("blur", function()
        {
          if(!emailAddressPattern.test($(this).val().toString()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Email Address.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function formValidation():void
    {
      testFullName();
      testContactNumber();
      testEmailAddress();
    }

    function displayContact(): void
    {
      // form validation
      formValidation();

        $("#sendButton").on("click", (event)=> 
        {
          let subscribeCheckbox = $("#subscribeCheckbox")[0] as HTMLInputElement;
          let fullName = $("#fullName")[0] as HTMLInputElement;
          let contactNumber = $("#contactNumber")[0] as HTMLInputElement;
          let emailAddress = $("#emailAddress")[0] as HTMLInputElement;

          if(subscribeCheckbox.checked)
          {
            let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);

            if(contact.serialize())
            {
              let key = contact.FullName.substring(0, 1) + Date.now();

              localStorage.setItem(key, contact.serialize());
            }
          }

          location.href = '/contact';
          //loadLink("contact"); // reload contact page
        });
    }

    function displayContactList() :void
    {
      // don't allow visitors to go here

      authGuard();

      $("a.delete").on("click", function(event){
        if(!confirm("Are you sure?"))
        {
          event.preventDefault();
          location.href = '/contact-list';
        }
      });

      /* if (localStorage.length > 0) 
      {
        let contactList = document.getElementById("contactList");
        let data = "";
        let keys = Object.keys(localStorage);
         
        let index = 1;
        for (const key of keys) 
        {
          let contactData = localStorage.getItem(key);
          let contact = new core.Contact();
          contact.deserialize(contactData);
          data += `<tr>
          <th scope="row" class="text-center">${index}</th>
          <td>${contact.FullName}</td>
          <td>${contact.ContactNumber}</td>
          <td>${contact.EmailAddress}</td>
          <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
          <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
          </tr>`;
          index++;
        }
        contactList.innerHTML = data;
        $("button.edit").on("click", function(){
          //loadLink("edit", $(this).val().toString());
          location.href = '/edit';
         });
         $("button.delete").on("click", function(){
           if(confirm("Are you sure?"))
           {
            localStorage.removeItem($(this).val().toString());
           }
           //loadLink("contact-list"); 
           // refresh the page
           location.href = '/contact-list';
         });
      }
      $("#addButton").on("click", function() 
      {
      //loadLink("edit");
      location.href = '/edit';
      }); */
    }

    function displayEdit(): void
    {
      // form validation
      formValidation();
    } 

    function displayLogin():void
    {
      let messageArea = $("#messageArea");
      messageArea.hide();

      $("#loginButton").on("click", function() 
      {
        let username = $("#username");
        let password = $("#password");
        let success = false;
        let newUser = new core.User();

        // use ajax to access the json file
        $.get("./Data/users.json", function(data)
        {
          // check each user in the users.json file  (linear search)
          for (const user of data.users) 
          {
            if(username.val() == user.Username && password.val() == user.Password)
            {
              newUser.fromJSON(user);
              success = true;
              break;
            }
          }

          // if username and password matches - success... then perform login
          if(success)
          {
            // add user to session storage
            sessionStorage.setItem("user", newUser.serialize());

            // hide any error message
            messageArea.removeAttr("class").hide();

            // redirect user to secure area - contact-list.html
            //loadLink("contact-list");
            //location.href = '/contact-list';

            $("form").trigger("submit");
          }
          else
          {
            // display an error message
            username.trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Error: Invalid login information");
          }
        });
      });

      $("#cancelButton").on("click", function()
      {
        // clear the login form
        document.forms[0].reset();
        // return to the home page
        //loadLink("home");
        location.href = '/home';
      });
    }

    function performLogout():void
    {
        sessionStorage.clear();
        location.href = '/login';
    }

    /* function toggleLogin(): void
    {
      let contactListLink = $("#contactListLink")[0]; // makes a reference to the contact-list link
      // if user is logged in
      if(sessionStorage.getItem("user"))
      { //Logged in -----------------------
        // swap out the login link for logout
        $("#loginListItem").html(
        `<a id="logout" class="nav-link" aria-current="page"><i class="fas fa-sign-out-alt"></i> Logout</a>`
        );
        if(!contactListLink) // checks if contact-list link is not already present
        {
          // add contact-list link
          $(`<li id="contactListLink" class="nav-item">
          <a id="contact-list" class="nav-link" aria-current="page"><i class="fas fa-users fa-lg"></i> Contact List</a>
        </li>`).insertBefore("#loginListItem");
        }
      }
      else
      { // Logged out-----------------------
        // swap out the login link for logout
        $("#loginListItem").html(
          `<a id="login" class="nav-link" aria-current="page"><i class="fas fa-sign-in-alt"></i> Login</a>`
          );
          
        if(contactListLink) // checks if contact-list link is present
        {
          // remove contact-list link
          $("#contactListLink").remove();
        }
      }
      //addLinkEvents();
      //highlightActiveLink(router.ActiveLink);
    } */

    function authGuard():void
    {
      if(!sessionStorage.getItem("user"))
      {
      // redirect back to login page
      //loadLink("login");
      location.href = '/login';
      }
    }

    function display404():void
    {

    }

      /**
     * This is the entry point for our program
     *
     */
    function Start(): void
    {

        let pageID = $("body")[0].getAttribute("id");
        
      switch (pageID) 
      {
        case 'edit':
          displayEdit();
          break;
        case 'contact':
          displayContact();
          break;
        case 'login':
          displayLogin();
          break;
        case 'logout':
          performLogout();
        case 'register':
          break;
        case 'contact-list':
          displayContactList();
          break;
      }
    }

    window.addEventListener("load", Start);

}