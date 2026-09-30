export class Validatorr
{
	constructor(formInstance)
	{
		this.formInstance = formInstance;
		this.initCallbacks();
	}

	validate()
	{
		this.errors = [];
		let formFields = this.formInstance.querySelectorAll('._field'),
			hasErrors   = false,
			self        = this;
		formFields.forEach(function(field,fieldIndex)
		{
			field.classList.remove('error');

			let errorMsgElement = field.querySelector('._error-msg');
			if (errorMsgElement) {
				errorMsgElement.innerHTML = '';
			}


			let callbacks = field.dataset.call;

			if(typeof callbacks == 'undefined')
				return true;

			callbacks = callbacks.replace(/ +/g,' ').trim().split(' ');

			for(let callback of callbacks)
			{
				if(!self.callbacks[callback].call(self,field))
				{
					hasErrors = true;
					field.classList.add('error')
					return true;
				}
			}

		});
		return !hasErrors;
	}

	initCallbacks()
	{
		this.callbacks =
		{
			phone(field)
			{
				let input = field.querySelector('input');
				const regex = /^((\+7|7|8)+\-[0-9]{3}\-[0-9]{3}\-[0-9]{2}\-[0-9]{2})$/;
				if(regex.test(input.value.trim()))
					return true;
				this.setMessage(field,'Телефон введен не корректно');
				return false;
			},

            email(field)
            {
                let input = field.querySelector('input');
                if (!input) return true;

                const value = input.value.trim();
                if (value === '') return true; // Не проверяем пустое поле, для этого есть 'empty'

                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (regex.test(value)) {
                    return true;
                }
                
                this.setMessage(field, 'Email введен некорректно');
                return false;
            },

            empty(field) {
                const input = field.querySelector('input');
                const textarea = field.querySelector('textarea');

                // ?.value вернет undefined вместо ошибки, если input или textarea равны null
                const inputValue = input?.value;
                const textareaValue = textarea?.value;

                // Проверяем, что хотя бы одно из полей было найдено и оказалось пустым
                if ((inputValue !== undefined && inputValue.trim() === '') || 
                    (textareaValue !== undefined && textareaValue.trim() === '')) {
                    this.setMessage(field, 'Заполните поле');
                    return false;
                }

                return true;
            }
		};
	}

	setMessage(field,msg)
	{
		// console.log('field:',field)
		field.querySelector('._error-msg').innerHTML = msg;
	}

}