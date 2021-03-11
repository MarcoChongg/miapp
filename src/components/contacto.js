import React from 'react';

export const Contacto =  () => (
    <div>
        <div class="col-md-4 multi-horizontal">
            <div class="form-group">
                <label class="form-control-label mbr-fonts-style display-7" for="name-form1-4">Name</label>
                <input type="text" class="form-control" name="name" data-form-field="Name" required="" id="name-form1-4"/>
            </div>
        </div>
        <div class="col-md-4 multi-horizontal">
            <div class="form-group">
                <label class="form-control-label mbr-fonts-style display-7" for="email-form1-4">Email</label>
                <input type="email" class="form-control" name="email" data-form-field="Email" required="" id="email-form1-4"/>
            </div>
        </div>
        <div class="col-md-4 multi-horizontal">
            <div class="form-group">
                <label class="form-control-label mbr-fonts-style display-7" for="phone-form1-4">Phone</label>
                <input type="tel" class="form-control" name="phone" data-form-field="Phone" id="phone-form1-4"/>
            </div>
        </div>
        <button href="" type="submit" class = 'button' >SEND FORM</button>
    </div>

)

//<>>