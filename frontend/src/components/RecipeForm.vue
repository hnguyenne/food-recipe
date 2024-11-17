<script setup>
import { ref, useTemplateRef, computed } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { DEFAULT_IMG } from '@/constants';

const props = defineProps({
    recipe: { type: Object, required: true },
});

let imgFileInput = useTemplateRef('img-file-input');
let imgFile = ref(props.recipe.IMG_URL ?? DEFAULT_IMG);
const $emit = defineEmits(['submit:recipe', 'delete:recipe']);

let validationSchema = toTypedSchema(
    z.object({
        tittle: z.string().min(1, {message: "Tên công thức không được để trống"}),
        description: z.string().min(1, {message: "Hãy thêm mô tả cho công thức của bạn"}),
        tags: z.string(),
        prep_time: z.number().min(0, {message: "Thời gian chuẩn bị phải là số dương"}),
        cook_time: z.number().min(0, {message: "Thời gian nấu phải là số dương"}),
        servings: z.number().min(1, {message: "Khẩu phần phục vụ phải lớn hơn 0"}),
        instruction: z.string().min(1, { message: "Hãy thêm hướng dẫn thực hiện"}),
        note: z.string().optional(),
        imgFile: z.instanceof(File).optional(),
    })
);

function previewImgFile(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
        imgFile.value = evt.target.result;
    }
    reader.readAsDataURL(file);
}

function submitRecipe(values) {
    let formData = new FormData();
    for (let key in values){
        if (values[key] !== undefined){
            formData.append(key, values[key]);
        }
    }
    const user = JSON.parse(localStorage.getItem('user_login'));
    formData.append('user_id', user.USER_ID)

    if (props.recipe.recipe_id) {
        formData.append('recipe_id', recipe.recipe_id);
    }
    $emit('submit:recipe', formData);
}

function deleteRecipe(){
    $emit('delete:recipe', props.recipe.RECIPE_ID  ?? props.recipe.recipe_id)
}
</script>
<template>
    <Form :validation-schema="validationSchema" @submit = "submitRecipe">
        <div class="mb-3">
            <label for="tittle" class="form-label">Đặt tiêu đề cho công thức của bạn</label>
            <Field name="tittle" type = "text" class = "form-control" :value = "recipe.tittle ?? recipe.TITTLE">
            </Field>
            <ErrorMessage name = "tittle" class= "error-feedback" />

        </div>
        <div class = "mb-3">
            <label for="description" class="form-label">Miêu tả công thức của bạn, bao gồm cả nguyên liệu</label>
            <Field name = "description" as="textarea" rows="5" class = "form-control" :value = "recipe.description ?? recipe.DESCRIPTION"></Field>
            <ErrorMessage name = "description" class= "error-feedback" />
        </div>
         <div class = "mb-3">
            <label for="tags" class="form-label">Các nhãn để người khác tìm thấy công thức của bạn (Bánh ngọt, món chay,...)</label>
            <field name = "tags" type = "text" class = "form-control" :value = "recipe.tags ?? recipe.TAGS"></field>
            <ErrorMessage name = "tags" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="prep_time" class="form-label">Thời gian chuẩn bị nguyên liệu</label>
            <field name = "prep_time" type = "number" class = "form-control" :value = "recipe.prep_time ?? recipe.PREP_TIME"></field>
            <ErrorMessage name = "prep_time" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="cook_time" class="form-label">Thời gian chế biến</label>
            <field name = "cook_time" type = "number" class = "form-control" :value = "recipe.cook_time ?? recipe.COOK_TIME"></field>
            <ErrorMessage name = "cook_time" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="servings" class="form-label">Khẩu phần</label>
            <field name = "servings" type = "number" class = "form-control" :value = "recipe.servings ?? recipe.SERVINGS"></field>
            <ErrorMessage name = "servings" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="instruction" class="form-label">Hướng dẫn các bước thực hiện</label>
            <field name = "instruction" as="textarea" rows="5" class = "form-control" :value = "recipe.instruction ?? recipe.INSTRUCTION"></field>
            <ErrorMessage name = "instruction" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="note" class="form-label">Những điểm cần lưu ý</label>
            <field name = "note" type = "text" class = "form-control" :value = "recipe.note ?? recipe.NOTE"></field>
            <ErrorMessage name = "note" class= "error-feedback" />
        </div>
        <div class="mb-3 w-50 h-50">
            <label for="imgFile">Thêm một hình ảnh thành phẩm nấu ăn của bạn</label>
            <img
                class="img-fluid img-thumbnail"
                :src="imgFile"
                alt=""
                @click="imgFileInput.click()"
            />
            <Field name="imgFile" v-slot="{ handleChange }">
                <input
                    type="file"
                    class="d-none"
                    ref="img-file-input"
                    @change="
                    (event) => {
                        handleChange(event);
                        previewImgFile(event);
                    }
                "
            />
            </Field>
        </div>
        <div class="mb-3">
            <button class="btn btn-primary"><i class="fas fa-save"></i>Lưu công thức</button>
            <button
                v-if="recipe.RECIPE_ID"
                type="button"
                class="ms-2 btn btn-danger"
                @click="deleteRecipe">
                    <i class="fa fa-trash">Xóa công thức này</i>
            </button>
        </div>
    </Form>
</template>

<style scoped>
@import '../assets/form.css';
</style>