module Api
  module V1
    class InsightsController < ApplicationController
      def index
        render json: {
          employee_count_by_country: employee_count_by_country,
          employee_count_by_department: employee_count_by_department,
          average_salary_by_country: average_salary_by_country,
          average_salary_by_department: average_salary_by_department
        }
      end

      private

      def employee_count_by_country
        Employee.joins(:country)
                .group("countries.name")
                .count
      end

      def employee_count_by_department
        Employee.joins(:department)
                .group("departments.name")
                .count
      end

      def average_salary_by_country
        Salary.joins(employee: :country)
              .group("countries.name", :currency)
              .average(:amount)
      end

      def average_salary_by_department
        Salary.joins(employee: :department)
              .group("departments.name", :currency)
              .average(:amount)
      end
    end
  end
end
